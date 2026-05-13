import { Link, useLocation } from "react-router-dom";

import {
  FaHome,
  FaTicketAlt,
  FaChartBar,
  FaPrayingHands,
  FaDonate,
  FaWallet,
  FaBoxOpen,
  FaClipboardList,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div style={styles.sidebar}>
      {/* TOP */}
      <div style={styles.top}>
        <h2 style={styles.logo}>
          🛕 Temple ERP
        </h2>

        <p style={styles.subtitle}>
          Sri Raghavendra Admin
        </p>
      </div>

      {/* MENU */}
      <ul style={styles.list}>
        <li>
          <Link
            style={{
              ...styles.link,
              ...(isActive("/dashboard")
                ? styles.active
                : {}),
            }}
            to="/dashboard"
          >
            <FaHome />
            <span>Dashboard</span>
          </Link>
        </li>

        <li>
          <Link
            style={{
              ...styles.link,
              ...(isActive("/tickets")
                ? styles.active
                : {}),
            }}
            to="/tickets"
          >
            <FaTicketAlt />
            <span>Pooja Tickets</span>
          </Link>
        </li>

        <li>
          <Link
            style={{
              ...styles.link,
              ...(isActive("/reports")
                ? styles.active
                : {}),
            }}
            to="/reports"
          >
            <FaChartBar />
            <span>Reports</span>
          </Link>
        </li>

        <li>
          <Link
            style={{
              ...styles.link,
              ...(isActive("/pooja-analytics")
                ? styles.active
                : {}),
            }}
            to="/pooja-analytics"
          >
            <FaClipboardList />
            <span>Pooja Analytics</span>
          </Link>
        </li>

        <li>
          <Link
            style={{
              ...styles.link,
              ...(isActive("/pooja-master")
                ? styles.active
                : {}),
            }}
            to="/pooja-master"
          >
            <FaPrayingHands />
            <span>Pooja Master</span>
          </Link>
        </li>

        <li>
          <Link
            style={{
              ...styles.link,
              ...(isActive("/donations")
                ? styles.active
                : {}),
            }}
            to="/donations"
          >
            <FaDonate />
            <span>Donations</span>
          </Link>
        </li>

        <li>
          <Link
            style={{
              ...styles.link,
              ...(isActive("/expenses")
                ? styles.active
                : {}),
            }}
            to="/expenses"
          >
            <FaWallet />
            <span>Expenses</span>
          </Link>
        </li>

        <li>
          <Link
            style={{
              ...styles.link,
              ...(isActive("/inventory")
                ? styles.active
                : {}),
            }}
            to="/inventory"
          >
            <FaBoxOpen />
            <span>Inventory</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

const styles = {
  sidebar: {
    width: "260px",
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #2d1f14, #1a120d)",
    padding: "22px",
    color: "#fff",
    position: "sticky",
    top: 0,
  },

  top: {
    marginBottom: "30px",
  },

  logo: {
    color: "#f5d08a",
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "5px",
  },

  subtitle: {
    color: "#cbb89a",
    fontSize: "13px",
  },

  list: {
    listStyle: "none",
    padding: 0,
  },

  link: {
    display: "flex",
    alignItems: "center",
    gap: "12px",

    textDecoration: "none",
    color: "#f5e6c8",

    padding: "13px 14px",
    borderRadius: "12px",

    marginBottom: "12px",

    background: "rgba(255,255,255,0.04)",

    transition: "0.3s ease",

    fontSize: "15px",
    fontWeight: "500",
  },

  active: {
    background: "#6b4f2a",
    color: "#fff",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.2)",
  },
};