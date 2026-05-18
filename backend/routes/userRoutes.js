const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createStaff,
  getUsers,
  getUserPermissions,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

/* CREATE */
router.post("/create", authMiddleware, adminMiddleware, createStaff);

/* GET USERS */
router.get("/", authMiddleware, adminMiddleware, getUsers);

/* GET PERMISSIONS */
router.get("/permissions/:id", authMiddleware, getUserPermissions);

/* UPDATE USER */
router.put("/:id", authMiddleware, adminMiddleware, updateUser);

/* DELETE USER */
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

module.exports = router;