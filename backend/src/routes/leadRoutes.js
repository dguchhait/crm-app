const express = require("express");
const router = express.Router();

const {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Read: any authenticated user can read their own leads; Admin can read all
router.get("/", protect, getLeads);

// Read single
router.get("/:id", protect, getLeadById);

// Create: Admin & Agent
router.post("/", protect, authorizeRoles("Admin", "Agent","User"), createLead);

// Update: protect, then controller will check ownership/role
router.put("/:id", protect, updateLead);

// Delete: Admin only
router.delete("/:id", protect, authorizeRoles("Admin"), deleteLead);

module.exports = router;
