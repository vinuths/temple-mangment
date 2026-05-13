const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createItem,
  getItems,
} = require("../controllers/inventoryController");

router.post(
  "/",
  authMiddleware,
  createItem
);

router.get(
  "/",
  authMiddleware,
  getItems
);

module.exports = router;