const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  createEmployee,
  getEmployees,
} = require(
  "../controllers/employeeController"
);

/* CREATE */

router.post(
  "/",
  authMiddleware,
  createEmployee
);

/* GET */

router.get(
  "/",
  authMiddleware,
  getEmployees
);

module.exports = router;