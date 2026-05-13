const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createPooja,
  getPoojas,
} = require("../controllers/poojaController");

// CREATE
router.post(
  "/",
  authMiddleware,
  createPooja
);

// GET
router.get(
  "/",
  authMiddleware,
  getPoojas
);

module.exports = router;