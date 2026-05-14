const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeName: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    salary: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Employee",
  employeeSchema
);