// components/Topbar.jsx
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={styles.topbar}>
      <h3 style={styles.title}>🛕 Sri Raghavendra Dashboard</h3>

      <div style={styles.right}>
        <span style={styles.user}>🙏 {user?.name}</span>

        <button style={styles.btn} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;

/* ================= STYLES ================= */

const styles = {
  topbar: {
    height: "65px",
    background: "linear-gradient(90deg, #3b2f2f, #1f1a17)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    color: "#f5e6c8",
  },
};