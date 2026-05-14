const mongoose = require("mongoose");

const hallBookingSchema =
  new mongoose.Schema(
    {
      customerName: String,

      mobile: String,

      functionType: String,

      hallName: String,

      bookingDate: Date,

      startTime: String,

      endTime: String,

      amount: Number,

      advance: Number,

      balance: Number,

      status: {
        type: String,
        default: "Confirmed",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "HallBooking",
  hallBookingSchema
);