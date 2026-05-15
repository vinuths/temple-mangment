const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createStaff,
  getUsers,
  getUserPermissions,
} = require("../controllers/userController");

/* ================= CREATE STAFF ================= */

router.post(
  "/create",
  authMiddleware,
  adminMiddleware,
  createStaff
);

/* ================= GET USERS ================= */

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getUsers
);

/* ================= GET USER PERMISSIONS ================= */

router.get(
  "/permissions/:id",
  authMiddleware,
  getUserPermissions
);

module.exports = router;