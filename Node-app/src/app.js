const express = require('express');
const requestLogger = require('./middlewares/requestLogger');
const errorHandler = require('./middlewares/errorHandler');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(requestLogger);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api', apiRoutes);

// Central error handler must be registered last.
app.use(errorHandler);

module.exports = app;
