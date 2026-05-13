const Ticket = require("../models/Ticket");

const getDateRangeReport = async (req, res) => {
  try {
    const { from, to } = req.query;

    let filter = {};

    // DATE FILTER
    if (from && to) {
      filter.date = {
        $gte: new Date(from),
        $lte: new Date(to),
      };
    }

    // ALL FILTERED TICKETS
    const tickets = await Ticket.find(filter);

    // TOTAL TICKETS
    const totalTickets = tickets.length;

    // TOTAL REVENUE
    const totalRevenue = tickets.reduce(
      (sum, t) =>
        sum + Number(t.price || 0) * Number(t.quantity || 1),
      0
    );

    // TODAY
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayTicketsData = tickets.filter(
      (t) => new Date(t.createdAt) >= today
    );

    const todayTickets = todayTicketsData.length;

    const todayRevenue = todayTicketsData.reduce(
      (sum, t) =>
        sum + Number(t.price || 0) * Number(t.quantity || 1),
      0
    );

    // DAILY DATA
    const grouped = {};

    tickets.forEach((t) => {
      const date = new Date(t.date)
        .toLocaleDateString();

      if (!grouped[date]) {
        grouped[date] = {
          date,
          tickets: 0,
          revenue: 0,
        };
      }

      grouped[date].tickets += Number(t.quantity || 1);

      grouped[date].revenue +=
        Number(t.price || 0) *
        Number(t.quantity || 1);
    });

    const dailyData = Object.values(grouped);

    res.json({
      success: true,
      data: {
        totalTickets,
        totalRevenue,
        todayTickets,
        todayRevenue,
        dailyData,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDateRangeReport,
};