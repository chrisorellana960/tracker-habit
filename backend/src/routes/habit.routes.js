const express = require("express");
const router = express.Router();
const { markAsDone } = require("../controllers/habit.controller");
const authMiddleware = require("../middleware/auth.middleware");

const {
  createHabit,
  getHabits,
  getHabit,
  updateHabit,
  deleteHabit,
} = require("../controllers/habit.controller");

router.post("/", authMiddleware, createHabit);
router.get("/", authMiddleware, getHabits);
router.get("/:id", authMiddleware, getHabit);
router.put("/:id", authMiddleware, updateHabit);
router.delete("/:id", authMiddleware, deleteHabit);
router.patch("/:id/done", authMiddleware, markAsDone);

module.exports = router;