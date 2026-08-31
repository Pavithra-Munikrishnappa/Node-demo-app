const { logInfo } = require('../utils/logger');

// Logs every incoming request (method + path) for basic observability.
function requestLogger(req, res, next) {
  logInfo(`${req.method} ${req.originalUrl}`);
  next();
}

module.exports = requestLogger;
