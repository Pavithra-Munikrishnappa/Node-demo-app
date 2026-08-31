const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(__dirname, '..', '..', 'logs');
const LOG_FILE = path.join(LOG_DIR, 'error.log');

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

/**
 * Writes a structured, parseable error log entry.
 * The AI Self-Healing Assistant (Application 2) tails this file,
 * so keep the format stable: JSON per line.
 */
function logError(err, context = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    level: 'ERROR',
    message: err.message,
    name: err.name,
    stack: err.stack,
    route: context.route || null,
    method: context.method || null
  };
  fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + '\n', 'utf8');
  console.error(`[ERROR] ${entry.timestamp} ${entry.name}: ${entry.message}`);
}

function logInfo(message) {
  console.log(`[INFO] ${new Date().toISOString()} ${message}`);
}

module.exports = { logError, logInfo, LOG_FILE };
