const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createExpense,
  getExpenses,
} = require("../controllers/expenseController");

router.post(
  "/",
  authMiddleware,
  createExpense
);

router.get(
  "/",
  authMiddleware,
  getExpenses
);

module.exports = router;