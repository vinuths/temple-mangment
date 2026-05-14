const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createPooja,
  getPoojas,
  updatePooja,
  deletePooja,
} = require("../controllers/poojaController");

// CREATE (ADMIN ONLY)
router.post("/", authMiddleware, adminMiddleware, createPooja);

// GET (ALL USERS LOGGED IN)
router.get("/", authMiddleware, getPoojas);

// UPDATE (ADMIN ONLY)
router.put("/:id", authMiddleware, adminMiddleware, updatePooja);

// DELETE (ADMIN ONLY)
router.delete("/:id", authMiddleware, adminMiddleware, deletePooja);

module.exports = router;