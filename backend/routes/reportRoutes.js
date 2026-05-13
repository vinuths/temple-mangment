const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getDateRangeReport,
} = require("../controllers/reportController");

router.get("/", authMiddleware, getDateRangeReport);

module.exports = router;