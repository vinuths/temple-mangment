import { useEffect, useState } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";
import CountUp from "react-countup";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API RESPONSE:", res.data);

      const data = res.data?.data || res.data || {};

      // 🔥 SAFE NUMBER CONVERTER (FIXES YOUR REVENUE ISSUE)
      const safeNumber = (val) => {
        if (val === null || val === undefined) return 0;
        if (typeof val === "number") return val;
        if (typeof val === "string") {
          const cleaned = val.replace(/[^0-9.]/g, "");
          return cleaned ? Number(cleaned) : 0;
        }
        return 0;
      };

      setStats({
        todayTickets: safeNumber(data.todayTickets ?? data.today_tickets),
        totalTickets: safeNumber(data.totalTickets ?? data.total_tickets),

        todayRevenue: safeNumber(data.todayRevenue ?? data.today_revenue),
        totalRevenue: safeNumber(data.totalRevenue ?? data.total_revenue),
      });
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= ANALYTICS ================= */

  const revenueBase = stats.todayRevenue || 0;
  const ticketBase = stats.todayTickets || 0;

  const revenueTrend = [
    { name: "Mon", value: revenueBase * 0.7 },
    { name: "Tue", value: revenueBase * 1.2 },
    { name: "Wed", value: revenueBase * 0.9 },
    { name: "Thu", value: revenueBase * 1.5 },
    { name: "Fri", value: revenueBase * 2 },
    { name: "Sat", value: revenueBase * 2.5 },
    { name: "Sun", value: revenueBase * 1.8 },
  ];

  const ticketTrend = [
    { name: "Mon", value: ticketBase * 2 },
    { name: "Tue", value: ticketBase * 3 },
    { name: "Wed", value: ticketBase * 1 },
    { name: "Thu", value: ticketBase * 4 },
    { name: "Fri", value: ticketBase * 5 },
    { name: "Sat", value: ticketBase * 6 },
    { name: "Sun", value: ticketBase * 3 },
  ];

  return (
    <MainLayout>
      <div style={styles.page}>
        <h2 style={styles.title}>🛕 Temple Analytics Dashboard</h2>

        {/* KPI CARDS */}
        <div style={styles.grid}>
          <Card title="Today Tickets" value={stats.todayTickets} />
          <Card title="Total Tickets" value={stats.totalTickets} />
          <Card title="Today Revenue" value={stats.todayRevenue} />
          <Card title="Total Revenue" value={stats.totalRevenue} />
        </div>

        {/* CHARTS */}
        <div style={styles.chartGrid}>
          {/* Revenue Chart */}
          <div style={styles.box}>
            <h3>📊 Revenue Trend</h3>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6b4f2a"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Ticket Chart */}
          <div style={styles.box}>
            <h3>🎟 Ticket Trend</h3>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={ticketTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8b6b3f" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;

/* ================= CARD ================= */

const Card = ({ title, value }) => {
  const safeValue = Number(value) || 0;

  return (
    <div style={styles.card}>
      <h4 style={styles.cardTitle}>{title}</h4>

      <h2 style={styles.cardValue}>
        <CountUp end={safeValue} duration={1} />
      </h2>
    </div>
  );
};

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: "15px",
  },

  title: {
    fontSize: "20px",
    color: "#3b2f2f",
    marginBottom: "15px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
    marginBottom: "20px",
  },

  card: {
    background: "#fffaf2",
    border: "1px solid #e6dcc7",
    borderRadius: "14px",
    padding: "18px",
  },

  cardTitle: {
    fontSize: "13px",
    color: "#6b4f2a",
  },

  cardValue: {
    fontSize: "26px",
    fontWeight: "700",
    marginTop: "8px",
  },

  chartGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "15px",
  },

  box: {
    background: "#fff",
    padding: "18px",
    borderRadius: "14px",
    border: "1px solid #e6dcc7",
  },
};