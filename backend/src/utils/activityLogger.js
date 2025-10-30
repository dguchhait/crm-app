const ActivityLog = require("../models/activityLogModel");

/**
 * Writes an activity log entry.
 * @param {Object} params
 * @param {String} params.resourceType - Type of resource ("Lead", "Deal", "User", etc.)
 * @param {ObjectId} params.resourceId - The ID of the affected resource.
 * @param {String} params.action - The action performed ("create", "update", "delete").
 * @param {ObjectId} params.performedBy - The user who performed the action.
 * @param {Object} [params.changes] - Optional object describing changes.
 */
async function logActivity({ resourceType, resourceId, action, performedBy, changes = {} }) {
  try {
    await ActivityLog.create({
      resourceType,
      resourceId,
      action,
      performedBy,
      changes,
    });
  } catch (error) {
    // Don't crash main flow — log error silently
    console.error("⚠️ Failed to write activity log:", error.message);
  }
}

module.exports = logActivity;
