const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const {
  registerUser,
  getAllUsers,
  getUserById,
  updateUserRole,
  updatePassword,
  deleteUser,
} = require("../controllers/userController");

// ✅ Routes

// Admin
router.post("/", protect, authorizeRoles("Admin"), registerUser);
router.get("/", protect, authorizeRoles("Admin"), getAllUsers);
router.get("/:id", protect, authorizeRoles("Admin"), getUserById);
router.put("/:id/role", protect, authorizeRoles("Admin"), updateUserRole);
router.delete("/:id", protect, authorizeRoles("Admin"), deleteUser);

// User
router.put("/update-password", protect, updatePassword);

module.exports = router;
