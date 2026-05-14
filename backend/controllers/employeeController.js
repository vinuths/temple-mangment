const Employee = require("../models/Employee");

/* CREATE EMPLOYEE */

exports.createEmployee = async (
  req,
  res
) => {
  try {
    const employee =
      await Employee.create(req.body);

    res.status(201).json({
      success: true,
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* GET EMPLOYEES */

exports.getEmployees = async (
  req,
  res
) => {
  try {
    const employees =
      await Employee.find().sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};