const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  createBooking,
  getBookings,
} = require(
  "../controllers/hallBookingController"
);

router.post(
  "/",
  authMiddleware,
  createBooking
);

router.get(
  "/",
  authMiddleware,
  getBookings
);

module.exports = router;