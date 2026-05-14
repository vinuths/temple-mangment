const Ticket = require("../models/Ticket");

/* ================= CREATE TICKET ================= */

const createTicket = async (req, res) => {
  try {
    const {
      poojaName,
      devoteeName,
      mobile,
      date,
      price,
      quantity,
      paymentMethod,
      paymentStatus,
    } = req.body;

    const lastTicket = await Ticket.findOne().sort({
      createdAt: -1,
    });

    let nextNumber = 1;

    if (lastTicket?.receiptNo) {
      const lastNum = parseInt(
        lastTicket.receiptNo.split("-")[1]
      );

      nextNumber = lastNum + 1;
    }

    const receiptNo = `TKT-${String(
      nextNumber
    ).padStart(5, "0")}`;

    const totalAmount =
      Number(price || 0) *
      Number(quantity || 1);

    const ticket = await Ticket.create({
      receiptNo,
      poojaName,
      devoteeName,
      mobile,
      date,
      price,
      quantity,
      totalAmount,
      paymentMethod,
      paymentStatus,
    });

    res.status(201).json({
      success: true,
      message: "Ticket Created",
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET TICKETS ================= */

const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      tickets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTicket,
  getTickets,
};