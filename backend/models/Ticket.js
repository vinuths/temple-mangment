const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    receiptNo: {
      type: String,
      unique: true,
    },

    poojaName: {
      type: String,
    },

    devoteeName: {
      type: String,
    },

    mobile: {
      type: String,
    },

    date: {
      type: Date,
    },

    price: {
      type: Number,
      default: 0,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    totalAmount: {
      type: Number,
      default: 0,
    },

    paymentMethod: {
      type: String,
      default: "Cash",
    },

    paymentStatus: {
      type: String,
      default: "Paid",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Ticket",
  ticketSchema
);