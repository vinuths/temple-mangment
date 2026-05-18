const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Permission = require("../models/Permission");

/* ================= CREATE STAFF USER ================= */
const createStaff = async (req, res) => {
  try {
    const { name, mobile, username, password, role, permissions } =
      req.body;

    const existing = await User.findOne({ username });

    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      mobile,
      username,
      password: hashed,
      role: role || "staff",
    });

    await Permission.create({
      userId: user._id,
      modules: permissions || [],
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

/* ================= GET USERS ================= */
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET PERMISSIONS ================= */
const getUserPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findOne({
      userId: req.params.id,
    });

    res.json({ success: true, permissions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE USER + PERMISSIONS ================= */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, mobile, username, password, role, permissions } =
      req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // update fields
    user.name = name;
    user.mobile = mobile;
    user.username = username;
    user.role = role;

    // update password only if sent
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    // update permissions (IMPORTANT)
    await Permission.findOneAndUpdate(
      { userId: id },
      { modules: permissions || [] },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= DELETE USER ================= */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);
    await Permission.findOneAndDelete({ userId: id });

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createStaff,
  getUsers,
  getUserPermissions,
  updateUser,
  deleteUser,
};