const Deal = require("../models/dealModel");
const ActivityLog = require("../models/activityLogModel"); // Import Activity Log Model

// -------------------- CREATE DEAL --------------------
exports.createDeal = async (req, res) => {
  try {
    const { title, amount, stage, expectedCloseDate, lead } = req.body;

    const deal = await Deal.create({
      title,
      amount,
      stage,
      expectedCloseDate,
      lead,
      createdBy: req.user._id,
    });

    // ✅ Log activity
    await ActivityLog.create({
      resourceType: "Deal",
      resourceId: deal._id,
      action: "create",
      performedBy: req.user._id,
      changes: { title, amount, stage, expectedCloseDate, lead },
    });

    res.status(201).json({
      success: true,
      deal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// -------------------- GET ALL DEALS --------------------
exports.getAllDeals = async (req, res) => {
  try {
    const deals = await Deal.find()
      .populate("lead")
      .populate("createdBy", "name email");
    res.json({ success: true, deals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// -------------------- UPDATE DEAL STAGE --------------------
exports.updateDealStage = async (req, res) => {
  try {
    const { id } = req.params;
    const { stage } = req.body;

    const deal = await Deal.findByIdAndUpdate(id, { stage }, { new: true });

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    // ✅ Log activity
    await ActivityLog.create({
      resourceType: "Deal",
      resourceId: deal._id,
      action: "update_stage",
      performedBy: req.user._id,
      changes: { stage },
    });

    res.json({ success: true, deal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// -------------------- UPDATE DEAL --------------------
exports.updateDeal = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const deal = await Deal.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    // ✅ Log activity
    await ActivityLog.create({
      resourceType: "Deal",
      resourceId: deal._id,
      action: "update",
      performedBy: req.user._id,
      changes: updates,
    });

    res.json({ success: true, deal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// -------------------- DELETE DEAL --------------------
exports.deleteDeal = async (req, res) => {
  try {
    const { id } = req.params;

    const deal = await Deal.findById(id);
    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    await deal.deleteOne();

    // ✅ Log activity
    await ActivityLog.create({
      resourceType: "Deal",
      resourceId: id,
      action: "delete",
      performedBy: req.user._id,
      changes: { deleted: true },
    });

    res.json({ success: true, message: "Deal deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
