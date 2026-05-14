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
    const poojas = await Pooja.find({ status: true });

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

//////////////////////////////
// ✅ UPDATE POOJA
//////////////////////////////
const updatePooja = async (req, res) => {
  try {
    const updated = await Pooja.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Pooja not found",
      });
    }

    res.json({
      success: true,
      message: "Pooja updated successfully",
      pooja: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//////////////////////////////
// ✅ DELETE POOJA (SOFT DELETE)
//////////////////////////////
const deletePooja = async (req, res) => {
  try {
    const deleted = await Pooja.findByIdAndUpdate(
      req.params.id,
      { status: false },
      { new: true }
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Pooja not found",
      });
    }

    res.json({
      success: true,
      message: "Pooja deleted successfully",
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
  updatePooja,
  deletePooja,
};