const express = require("express");
const {
  getAllExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  bulkDeleteExpenses,
} = require("../controllers/expenseController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, getAllExpenses);
router.post("/", protect, addExpense);
router.patch("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);
router.delete("/", protect, bulkDeleteExpenses);

module.exports = router;
