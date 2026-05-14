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

    const receiptNo = `TKT-${String(nextNumber).padStart(5, "0")}`;

    const totalAmount =
      Number(price || 0) * Number(quantity || 1);

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

/* ================= UPDATE TICKET ================= */

const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
      ticket: updatedTicket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= DELETE TICKET ================= */

const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Ticket.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ticket deleted successfully",
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
  updateTicket,
  deleteTicket,
};