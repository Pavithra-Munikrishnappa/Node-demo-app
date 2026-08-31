# Application 1 – Demo Backend Application

A layered Node.js/Express REST API (controller → service → data) that serves
dummy user/product data and intentionally contains bugs. It exists only to be
*monitored* by Application 2 (the AI Self-Healing Assistant).

Built on **Express 5.2** (latest) and requires **Node.js 18+**.

## Architecture

```
application1/
├── server.js                    # process entrypoint (starts the HTTP server)
├── src/
│   ├── app.js                   # Express app: middleware + route wiring
│   ├── routes/                  # HTTP method + path → controller mapping
│   │   ├── index.js
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   └── divideRoutes.js
│   ├── controllers/             # request/response handling only
│   │   ├── userController.js
│   │   ├── productController.js
│   │   └── divideController.js
│   ├── services/                # business logic (bugs live here)
│   │   ├── userService.js       # contains the null-pointer bug
│   │   ├── productService.js
│   │   └── divideService.js     # contains the divide-by-zero bug
│   ├── middlewares/
│   │   ├── requestLogger.js     # logs every incoming request
│   │   └── errorHandler.js      # central error handler → logs/error.log
│   ├── data/                    # in-memory dummy "database"
│   │   ├── users.js
│   │   └── products.js
│   └── utils/
│       └── logger.js            # structured JSON error logging
└── logs/error.log                # tailed by Application 2
```

## Endpoints

| Method | Path                | Description                    | Known bug |
|--------|---------------------|---------------------------------|-----------|
| GET    | `/health`           | Health check                    | none |
| GET    | `/api/users`        | List dummy users                | none |
| GET    | `/api/users/:id`    | Get a single user                | **Null Pointer**: user id `3` has no `profile` field, so `user.profile.address` throws `TypeError: Cannot read properties of undefined (reading 'address')` |
| POST   | `/api/users`        | Create a user (random dummy data, override with `{ "name", "email", "address" }`) | none |
| GET    | `/api/products`     | List dummy products             | none |
| GET    | `/api/products/:id` | Get a single product             | none |
| POST   | `/api/products`     | Create a product (random dummy data, override with `{ "name", "category", "price" }`) | none |
| GET    | `/api/divide?a=&b=` | Divide `a` by `b`                | **Divide-by-zero**: `b=0` throws `Error: Division by zero is not allowed` |

## Setup

```bash
cd application1
npm install
npm start
```

Server runs on `http://localhost:3000` by default (override with `PORT` env var).

## Trying it out

```bash
# Random data endpoints
curl http://localhost:3000/api/users
curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d "{}"
curl http://localhost:3000/api/products
curl -X POST http://localhost:3000/api/products -H "Content-Type: application/json" -d "{}"

# Null pointer bug
curl http://localhost:3000/api/users/3

# Divide-by-zero bug
curl "http://localhost:3000/api/divide?a=10&b=0"
```

Each failure is:
1. Thrown/forwarded from the service layer, caught by the Express 5 error-handling middleware in `src/middlewares/errorHandler.js` (Express 5 auto-forwards errors from sync and async handlers — no try/catch needed in controllers).
2. Logged as a single-line JSON record to `logs/error.log` via `src/utils/logger.js`.

## Log format (`logs/error.log`)

```json
{"timestamp":"2026-08-31T10:00:00.000Z","level":"ERROR","message":"Cannot read properties of undefined (reading 'address')","name":"TypeError","stack":"TypeError: ...\n    at ... (src/services/userService.js:20:30)","route":"/api/users/3","method":"GET"}
```

Application 2 tails this file, parses the stack trace to find the offending
source file/line, and generates a fix.

