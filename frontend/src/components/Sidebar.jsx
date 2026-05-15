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

  const isActive = (path) => location.pathname === path;

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const permissions = user.permissions || [];

  const canAccess = (module) => {
    if (user.role === "admin") return true;
    return permissions.includes(module);
  };

  return (
    <div style={styles.sidebar}>
      {/* TOP */}
      <div style={styles.top}>
        <h2 style={styles.logo}>🛕 Temple ERP</h2>
        <p style={styles.subtitle}>Sri Raghavendra Admin</p>
      </div>

      {/* MENU */}
      <ul style={styles.list}>

        {canAccess("dashboard") && (
          <li>
            <Link
              to="/dashboard"
              style={{
                ...styles.link,
                ...(isActive("/dashboard") ? styles.active : {}),
              }}
            >
              <FaHome />
              <span>Dashboard</span>
            </Link>
          </li>
        )}

        {canAccess("tickets") && (
          <li>
            <Link
              to="/tickets"
              style={{
                ...styles.link,
                ...(isActive("/tickets") ? styles.active : {}),
              }}
            >
              <FaTicketAlt />
              <span>Pooja Tickets</span>
            </Link>
          </li>
        )}

        {canAccess("reports") && (
          <li>
            <Link
              to="/reports"
              style={{
                ...styles.link,
                ...(isActive("/reports") ? styles.active : {}),
              }}
            >
              <FaChartBar />
              <span>Reports</span>
            </Link>
          </li>
        )}

        {canAccess("pooja-analytics") && (
          <li>
            <Link
              to="/pooja-analytics"
              style={{
                ...styles.link,
                ...(isActive("/pooja-analytics") ? styles.active : {}),
              }}
            >
              <FaClipboardList />
              <span>Pooja Analytics</span>
            </Link>
          </li>
        )}

        {canAccess("pooja-master") && (
          <li>
            <Link
              to="/pooja-master"
              style={{
                ...styles.link,
                ...(isActive("/pooja-master") ? styles.active : {}),
              }}
            >
              <FaPrayingHands />
              <span>Pooja Master</span>
            </Link>
          </li>
        )}

        {canAccess("donations") && (
          <li>
            <Link
              to="/donations"
              style={{
                ...styles.link,
                ...(isActive("/donations") ? styles.active : {}),
              }}
            >
              <FaDonate />
              <span>Donations</span>
            </Link>
          </li>
        )}

        {canAccess("expenses") && (
          <li>
            <Link
              to="/expenses"
              style={{
                ...styles.link,
                ...(isActive("/expenses") ? styles.active : {}),
              }}
            >
              <FaWallet />
              <span>Expenses</span>
            </Link>
          </li>
        )}

        {canAccess("inventory") && (
          <li>
            <Link
              to="/inventory"
              style={{
                ...styles.link,
                ...(isActive("/inventory") ? styles.active : {}),
              }}
            >
              <FaBoxOpen />
              <span>Inventory</span>
            </Link>
          </li>
        )}

        {canAccess("hall-bookings") && (
          <li>
            <Link
              to="/hall-bookings"
              style={{
                ...styles.link,
                ...(isActive("/hall-bookings") ? styles.active : {}),
              }}
            >
              🏛 <span>Hall Bookings</span>
            </Link>
          </li>
        )}

        {canAccess("employees") && (
          <li>
            <Link
              to="/employees"
              style={{
                ...styles.link,
                ...(isActive("/employees") ? styles.active : {}),
              }}
            >
              👨‍💼 <span>Employees</span>
            </Link>
          </li>
        )}

        {canAccess("users") && (
          <li>
            <Link
              to="/users"
              style={{
                ...styles.link,
                ...(isActive("/users") ? styles.active : {}),
              }}
            >
              👥 <span>Users</span>
            </Link>
          </li>
        )}

      </ul>
    </div>
  );
};

export default Sidebar;

const styles = {
  sidebar: {
    width: "260px",
    minHeight: "100vh",
    background: "linear-gradient(180deg, #2d1f14, #1a120d)",
    padding: "22px",
    color: "#fff",
    position: "sticky",
    top: 0,
  },

  top: { marginBottom: "30px" },

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
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
};