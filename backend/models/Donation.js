const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donorName: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
    },

    amount: {
      type: Number,
      required: true,
    },

    donationType: {
      type: String,
      default: "General",
    },

    receiptNo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Donation",
  donationSchema
);