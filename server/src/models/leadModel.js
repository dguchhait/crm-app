const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Lead name required"] },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    status: {
      type: String,
      enum: ["New", "In Progress", "Won", "Lost"],
      default: "New",
    },
    source: {
      type: String,
      enum: ["Website", "Referral", "Social Media", "Advertisement", "Other"],
      default: "Other",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // optional: keep a small local change history
    history: [
      {
        action: String, // "created", "updated", "deleted", "status_change"
        by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        at: { type: Date, default: Date.now },
        note: String,
        changes: mongoose.Schema.Types.Mixed,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
