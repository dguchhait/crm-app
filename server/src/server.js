require("dotenv").config(); // Load environment variables

const app = require("./app"); // Import Express app
const connectDB = require("./config/db"); // MongoDB connection function
const logger = require("./utils/logger"); // <-- Import your logger

// Port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB()
  .then(() => {
    // Start the server only after DB connection is successful
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error(`❌ Failed to connect to MongoDB: ${error.message}`);
    process.exit(1); // Exit process on DB connection failure
  });

// Handle uncaught exceptions and rejections globally
process.on("uncaughtException", (err) => {
  logger.error(`💥 Uncaught Exception: ${err.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  logger.error(`💥 Unhandled Rejection: ${err.message}`);
  process.exit(1);
});
