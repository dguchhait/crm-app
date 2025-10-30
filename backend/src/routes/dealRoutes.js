const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createDeal,
  getAllDeals,
  updateDealStage,
  updateDeal,
  deleteDeal,
} = require("../controllers/dealController");

router.post("/", protect, createDeal);
router.get("/", protect, getAllDeals);
router.put("/:id/stage", protect, updateDealStage);
router.put("/:id", protect, updateDeal);
router.delete("/:id", protect, deleteDeal);

module.exports = router;
