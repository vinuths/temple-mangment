const Ticket = require("../models/Ticket");

// DASHBOARD STATS
const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // today tickets
    const todayTickets = await Ticket.find({
      createdAt: { $gte: today },
    });

    // total tickets
    const totalTickets = await Ticket.countDocuments();

    // today revenue
    const todayRevenue = todayTickets.reduce(
      (sum, t) => sum + (t.price * t.quantity),
      0
    );

    // total revenue
    const allTickets = await Ticket.find();

    const totalRevenue = allTickets.reduce(
      (sum, t) => sum + (t.price * t.quantity),
      0
    );

    res.json({
      success: true,
      data: {
        todayTickets: todayTickets.length,
        totalTickets,
        todayRevenue,
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// POOJA ANALYTICS
const getPoojaAnalytics = async (req, res) => {
  try {
    const analytics = await Ticket.aggregate([
      {
        $group: {
          _id: "$poojaName",

          totalTickets: {
            $sum: "$quantity",
          },

          totalRevenue: {
            $sum: {
              $multiply: ["$price", "$quantity"],
            },
          },
        },
      },

      {
        $sort: {
          totalRevenue: -1,
        },
      },
    ]);

    res.json({
      success: true,
      analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// EXPORTS
module.exports = {
  getDashboardStats,
  getPoojaAnalytics,
};