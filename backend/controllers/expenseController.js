const Expense = require("../models/Expense");

/* ================= CREATE ================= */

exports.createExpense = async (
  req,
  res
) => {
  try {
    const expense =
      await Expense.create(req.body);

    res.status(201).json({
      success: true,
      message:
        "Expense added successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET ================= */

exports.getExpenses = async (
  req,
  res
) => {
  try {
    const expenses =
      await Expense.find().sort({
        createdAt: -1,
      });

    const totalExpense =
      expenses.reduce(
        (sum, e) => sum + e.amount,
        0
      );

    res.json({
      success: true,
      totalExpense,
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};