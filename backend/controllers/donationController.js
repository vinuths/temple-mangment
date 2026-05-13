const Donation = require("../models/Donation");

/* ================= CREATE ================= */

exports.createDonation = async (
  req,
  res
) => {
  try {
    const lastDonation =
      await Donation.findOne().sort({
        createdAt: -1,
      });

    let nextNumber = 1;

    if (
      lastDonation &&
      lastDonation.receiptNo
    ) {
      const lastNum = parseInt(
        lastDonation.receiptNo.split("-")[1]
      );

      nextNumber = lastNum + 1;
    }

    const receiptNo = `DON-${String(
      nextNumber
    ).padStart(5, "0")}`;

    const donation =
      await Donation.create({
        ...req.body,
        receiptNo,
      });

    res.status(201).json({
      success: true,
      message:
        "Donation added successfully",
      donation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET ================= */

exports.getDonations = async (
  req,
  res
) => {
  try {
    const donations =
      await Donation.find().sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      donations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};