const mongoose = require("mongoose");

const poojaSchema = new mongoose.Schema(
  {
    poojaName: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Pooja",
  poojaSchema
);