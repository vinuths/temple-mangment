const express = require("express");
const router = express.Router();

const {
  createTicket,
  getTickets,
} = require("../controllers/ticketController");

const authMiddleware = require("../middleware/authMiddleware");

// CREATE TICKET
router.post("/", authMiddleware, createTicket);

// GET ALL TICKETS
router.get("/", authMiddleware, getTickets);

module.exports = router;