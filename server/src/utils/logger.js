const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "../../logs");

// Ensure logs folder exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFile = path.join(logDir, "app.log");

/**
 * Writes log messages with timestamps.
 * @param {string} level - info | error | warn
 * @param {string} message
 */
function log(level, message) {
  const logMessage = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}\n`;
  fs.appendFileSync(logFile, logMessage);
  console.log(logMessage.trim());
}

module.exports = {
  info: (msg) => log("info", msg),
  error: (msg) => log("error", msg),
  warn: (msg) => log("warn", msg),
};
