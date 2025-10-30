const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getReportSummary } = require("../controllers/reportController");

// Protected route for Admin analytics
router.get("/summary", protect, getReportSummary);

module.exports = router;
