const Lead = require("../models/leadModel");
const Deal = require("../models/dealModel");

// 📈 Get overall CRM statistics
exports.getReportSummary = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const totalDeals = await Deal.countDocuments();

    const leadsByStatus = await Lead.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const dealsByStage = await Deal.aggregate([
      { $group: { _id: "$stage", count: { $sum: 1 } } },
    ]);

    const totalRevenue = await Deal.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
      success: true,
      summary: {
        totalLeads,
        totalDeals,
        leadsByStatus,
        dealsByStage,
        totalRevenue: totalRevenue[0]?.total || 0,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
