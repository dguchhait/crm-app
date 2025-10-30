const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    resourceType: { type: String, required: true }, // "Lead", "Deal", "User" ...
    resourceId: { type: mongoose.Schema.Types.ObjectId, required: true },
    action: { type: String, required: true }, // "create","update","delete"
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    performedAt: { type: Date, default: Date.now },
    changes: mongoose.Schema.Types.Mixed, // optional diff/metadata
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActivityLog", activityLogSchema);
