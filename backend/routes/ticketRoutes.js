const express = require("express");
const router = express.Router();

const {
  createTicket,
  getTickets,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");

const authMiddleware = require("../middleware/authMiddleware");

// CREATE
router.post("/", authMiddleware, createTicket);

// READ
router.get("/", authMiddleware, getTickets);

// UPDATE
router.put("/:id", authMiddleware, updateTicket);

// DELETE
router.delete("/:id", authMiddleware, deleteTicket);

module.exports = router;