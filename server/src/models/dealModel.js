const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Deal title is required"],
    },
    amount: {
      type: Number,
      required: [true, "Deal amount is required"],
    },
    stage: {
      type: String,
      enum: ["New", "In Progress", "Won", "Lost"],
      default: "New",
    },
    expectedCloseDate: {
      type: Date,
    },
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deal", dealSchema);
