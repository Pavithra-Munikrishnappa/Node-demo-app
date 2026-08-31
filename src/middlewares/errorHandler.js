const { logError } = require('../utils/logger');

// Central error handler: catches thrown/forwarded errors from controllers,
// logs them (to logs/error.log) and returns a 500 response.
// Express 5 automatically forwards errors thrown in sync AND async route
// handlers to this middleware, so controllers don't need try/catch.
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  logError(err, { route: req.originalUrl, method: req.method });
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
}

module.exports = errorHandler;
