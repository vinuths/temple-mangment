const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createDonation,
  getDonations,
} = require("../controllers/donationController");

router.post(
  "/",
  authMiddleware,
  createDonation
);

router.get(
  "/",
  authMiddleware,
  getDonations
);

module.exports = router;