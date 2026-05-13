const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getDashboardStats,
    getPoojaAnalytics,
} = require("../controllers/dashboardController");

// dashboard stats
router.get("/", authMiddleware, getDashboardStats);

// pooja analytics
router.get("/pooja-analytics", authMiddleware, getPoojaAnalytics);


module.exports = router;