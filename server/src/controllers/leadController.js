const Lead = require("../models/leadModel");
const logActivity = require("../utils/activityLogger");

/**
 * Create a lead — createdBy set to req.user._id
 */
exports.createLead = async (req, res, next) => {
  try {
    // req.user should exist (protect middleware)
    const payload = { ...req.body, createdBy: req.user._id };
    const lead = await Lead.create(payload);

    // optional local history
    lead.history.push({ action: "created", by: req.user._id, changes: payload });
    await lead.save();

    // central activity log
    logActivity({
      resourceType: "Lead",
      resourceId: lead._id,
      action: "create",
      performedBy: req.user._id,
      changes: payload,
    });

    res.status(201).json({ success: true, data: lead });
  } catch (err) {
    next(err);
  }
};

/**
 * Get leads with role-aware visibility:
 * - Admin: all leads
 * - Agent: leads they created (you can change to show all agents' leads)
 * - User: leads they created only
 */
exports.getLeads = async (req, res, next) => {
  try {
    const { status, source, search } = req.query;
    const query = {};

    if (status) query.status = status;
    if (source) query.source = source;
    if (search) query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];

    // Role based filtering
    if (req.user.role === "Admin") {
      // no extra filter
    } else {
      // Agents and Users see only their created leads (change policy as needed)
      query.createdBy = req.user._id;
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 }).populate("createdBy", "name email role");
    res.json({ success: true, count: leads.length, data: leads });
  } catch (err) {
    next(err);
  }
};

exports.getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id).populate("createdBy", "name email role");
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    // If not admin, ensure user has access
    if (req.user.role !== "Admin" && !lead.createdBy._id.equals(req.user._id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({ success: true, data: lead });
  } catch (err) {
    next(err);
  }
};

/**
 * Update — admin can update any; agent can update own lead
 */
exports.updateLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    // Authorization: Admin OR owner OR Agent (owner)
    if (req.user.role !== "Admin" && !lead.createdBy.equals(req.user._id)) {
      return res.status(403).json({ message: "Not allowed to update this lead" });
    }

    // Save previous state (optional)
    const before = lead.toObject();

    // apply updates
    Object.assign(lead, req.body);
    await lead.save();

    // push history
    lead.history.push({
      action: "updated",
      by: req.user._id,
      changes: { before, after: req.body },
    });
    await lead.save();

    // activity log central
    logActivity({
      resourceType: "Lead",
      resourceId: lead._id,
      action: "update",
      performedBy: req.user._id,
      changes: { before, after: req.body },
    });

    res.json({ success: true, data: lead });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete — Admin only (route also uses authorizeRoles("Admin"))
 */
exports.deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    logActivity({
      resourceType: "Lead",
      resourceId: lead._id,
      action: "delete",
      performedBy: req.user._id,
      changes: null,
    });

    res.json({ success: true, message: "Lead deleted" });
  } catch (err) {
    next(err);
  }
};
