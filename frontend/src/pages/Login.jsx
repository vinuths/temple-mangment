import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // ✅ NEW

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", {
        username,
        password,
        role, // ✅ SEND ROLE
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ ROLE BASED NAVIGATION
      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/tickets");
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.bg}></div>

      <div style={styles.overlay}>
        <div style={styles.imageBox}>
          <img
            src="/raghavendra.jpg"
            alt="Sri Raghavendra Swamy"
            style={styles.fullImage}
          />
        </div>

        <div style={styles.card}>
          <div style={styles.header}>
            <div style={styles.om}>ॐ</div>
            <h2 style={styles.title}>Sri Raghavendra Swamy</h2>
            <p style={styles.subtitle}>Temple Management Portal</p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={styles.field}>
              <label style={styles.label}>Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </div>

            {/* ✅ ROLE SELECT */}
            <div style={styles.field}>
              <label style={styles.label}>Login As</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={styles.input}
              >
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </select>
            </div>

            <button type="submit" style={styles.button}>
              Enter Dashboard
            </button>
          </form>

          <p style={styles.footer}>
            “Service to God is Service to Humanity”
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

/* ================= STYLES ================= */

const styles = {
  page: {
    height: "100vh",
    width: "100%",
    position: "relative",
    overflow: "hidden",
    fontFamily: "sans-serif",
  },

  bg: {
    position: "absolute",
    inset: 0,
    backgroundImage: "url('/raghavendra.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(18px) brightness(0.5)",
    transform: "scale(1.2)",
  },

  overlay: {
    position: "relative",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "40px",
    paddingRight: "6%",
  },

  imageBox: {
    width: "350px",
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  fullImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  card: {
    width: "90%",
    maxWidth: "360px",
    padding: "30px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.25)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  },

  header: {
    textAlign: "center",
    marginBottom: "20px",
  },

  om: {
    fontSize: "50px",
    color: "#ffd700",
  },

  title: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#fff",
  },

  subtitle: {
    fontSize: "12px",
    color: "#eee",
  },

  field: {
    marginBottom: "15px",
  },

  label: {
    fontSize: "12px",
    color: "#fff",
    marginBottom: "5px",
    display: "block",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.9)",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    marginTop: "10px",
    background: "linear-gradient(90deg, #b8860b, #d4af37)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
  },

  footer: {
    textAlign: "center",
    fontSize: "11px",
    marginTop: "15px",
    color: "#fff",
    opacity: 0.85,
  },
};