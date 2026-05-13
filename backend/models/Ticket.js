const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    receiptNo: {
      type: String,
      unique: true,
    },

    poojaName: String,
    devoteeName: String,
    mobile: String,
    date: Date,
    price: Number,
    quantity: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);