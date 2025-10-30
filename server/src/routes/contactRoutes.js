const express = require("express");
const router = express.Router();
const {
  createContact,
  getAllContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createContact);
router.get("/", protect, getAllContacts);
router.put("/:id", protect, updateContact);
router.delete("/:id", protect, deleteContact);

module.exports = router;
