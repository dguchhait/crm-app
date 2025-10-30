const logger = require("../utils/logger"); // Import your logger

exports.errorHandler = (err, req, res, next) => {
  // Log detailed error info (file + line + message)
  logger.error({
    message: err.message,
    stack: err.stack,
    route: req.originalUrl,
    method: req.method,
  });

  // Also log to console for quick debugging (in dev mode)
  if (process.env.NODE_ENV !== "production") {
    console.error("❌ Error:", err);
  }

  // Return standardized error response
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
