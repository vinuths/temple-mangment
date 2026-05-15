const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Permission = require("../models/Permission");

/* ================= REGISTER ================= */

const register = async (req, res) => {
  try {
    const {
      name,
      mobile,
      username,
      password,
      role,
    } = req.body;

    const existingUser =
      await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      mobile,
      username,
      password: hashedPassword,
      role: role || "staff",
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= LOGIN ================= */

const login = async (req, res) => {
  try {
    const {
      username,
      password,
      role,
    } = req.body;

    const user = await User.findOne({
      username,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid username",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    if (role && user.role !== role) {
      return res.status(400).json({
        success: false,
        message: `You are not registered as ${role}`,
      });
    }

    /* ===== GET PERMISSIONS ===== */

    const permissionData =
      await Permission.findOne({
        userId: user._id,
      });

    const permissions =
      permissionData?.modules || [];

    /* ===== TOKEN ===== */

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,

      user: {
        ...user._doc,
        permissions,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= RESET PASSWORD ================= */

const resetPassword = async (
  req,
  res
) => {
  try {
    const { username, password } =
      req.body;

    const user = await User.findOne({
      username,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= EXPORTS ================= */

module.exports = {
  register,
  login,
  resetPassword,
};