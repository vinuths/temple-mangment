const Inventory = require("../models/Inventory");

/* ================= CREATE ================= */

exports.createItem = async (
  req,
  res
) => {
  try {
    const item =
      await Inventory.create(req.body);

    res.status(201).json({
      success: true,
      message:
        "Item added successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET ================= */

exports.getItems = async (
  req,
  res
) => {
  try {
    const items =
      await Inventory.find().sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};