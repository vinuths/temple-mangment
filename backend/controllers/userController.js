const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Permission = require("../models/Permission");

/* ================= CREATE STAFF USER (ADMIN ONLY) ================= */
const createStaff = async (req, res) => {
  try {
    const { name, mobile, username, password, role, permissions } =
      req.body;

    const existing = await User.findOne({ username });

    if (existing) {
      return res
        .status(400)
        .json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      mobile,
      username,
      password: hashed,
      role: role || "staff",
    });

    // SAVE PERMISSIONS
    await Permission.create({
      userId: user._id,
      modules: permissions,
    });

    res.status(201).json({
      success: true,
      message: "Staff created",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= GET ALL USERS ================= */
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET SINGLE USER PERMISSIONS ================= */
const getUserPermissions = async (req, res) => {
  try {
    const { id } = req.params;

    const permissions = await Permission.findOne({
      userId: id,
    });

    res.json({ success: true, permissions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createStaff,
  getUsers,
  getUserPermissions,
};