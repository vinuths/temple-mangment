const HallBooking = require(
  "../models/HallBooking"
);

// CREATE BOOKING
exports.createBooking = async (
  req,
  res
) => {
  try {
    const balance =
      req.body.amount -
      req.body.advance;

    const booking =
      await HallBooking.create({
        ...req.body,
        balance,
      });

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET BOOKINGS
exports.getBookings = async (
  req,
  res
) => {
  try {
    const bookings =
      await HallBooking.find().sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};