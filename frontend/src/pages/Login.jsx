import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (error) {
      alert(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.mandala}></div>

      <div style={styles.card}>
        <div style={styles.header}>
          🕉️
          <h2 style={styles.title}>Sri Raghavendra Swamy Temple</h2>
          <p style={styles.subtitle}>Administrative Login Portal</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={styles.field}>
            <label style={styles.label}>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Enter Temple Dashboard
          </button>
        </form>

        <p style={styles.footer}>
          “Om Sri Raghavendraya Namaha”
        </p>
      </div>
    </div>
  );
};

export default Login;

/* ================= TEMPLE STYLES ================= */

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(180deg, #f7f1e3, #fffaf0)",
    position: "relative",
    overflow: "hidden",
  },

  mandala: {
    position: "absolute",
    width: "600px",
    height: "600px",
    background:
      "radial-gradient(circle, rgba(184,134,11,0.15), transparent 60%)",
    borderRadius: "50%",
    top: "-150px",
    right: "-150px",
    filter: "blur(2px)",
  },

  card: {
    width: "380px",
    padding: "30px",
    borderRadius: "14px",
    background: "#ffffff",
    border: "1px solid #e8e1d3",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    zIndex: 2,
  },

  header: {
    textAlign: "center",
    marginBottom: "25px",
  },

  title: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#5a3e1b",
    marginTop: "8px",
  },

  subtitle: {
    fontSize: "12px",
    color: "#8b6b3f",
  },

  field: {
    marginBottom: "15px",
  },

  label: {
    fontSize: "12px",
    color: "#6b4f2a",
    display: "block",
    marginBottom: "6px",
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #e0d6c2",
    outline: "none",
    background: "#fffdf8",
  },

  button: {
    width: "100%",
    padding: "11px",
    borderRadius: "8px",
    border: "none",
    background: "#b8860b",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
  },

  footer: {
    textAlign: "center",
    fontSize: "11px",
    color: "#8b6b3f",
    marginTop: "15px",
  },
};