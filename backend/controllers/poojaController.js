const Pooja = require("../models/Pooja");

// CREATE
const createPooja = async (req, res) => {
  try {
    const pooja = await Pooja.create(req.body);

    res.status(201).json({
      success: true,
      message: "Pooja created",
      pooja,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
const getPoojas = async (req, res) => {
  try {
    const poojas = await Pooja.find({
      status: true,
    });

    res.json({
      success: true,
      poojas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPooja,
  getPoojas,
};