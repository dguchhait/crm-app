const express = require("express");
const router = express.Router();
const ActivityLog = require("../models/activityLogModel");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate("performedBy", "name email")
      .sort({ createdAt: -1 });
    res.json({ success: true, logs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
