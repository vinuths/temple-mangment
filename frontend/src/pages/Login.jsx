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
      {/* BLURRED BACKGROUND (COVER) */}
      <div style={styles.bg}></div>

      {/* MAIN CONTENT */}
      <div style={styles.overlay}>
        {/* FULL IMAGE (NO CROP) */}
        <div style={styles.imageBox}>
          <img
            src="/raghavendra.jpg"
            alt="Sri Raghavendra Swamy"
            style={styles.fullImage}
          />
        </div>

        {/* LOGIN CARD */}
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

  /* BLURRED BACKGROUND */
  bg: {
    position: "absolute",
    inset: 0,
    backgroundImage: "url('/raghavendra.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(18px) brightness(0.5)",
    transform: "scale(1.2)",
  },

  /* MAIN LAYOUT */
  overlay: {
    position: "relative",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "40px",
    paddingRight: "6%",
  },

  /* FULL IMAGE (NO CROPPING) */
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
    objectFit: "contain", // ✅ NO CROPPING
  },

  /* LOGIN CARD */
  card: {
    width: "90%",
    maxWidth: "360px",

    padding: "30px",
    borderRadius: "20px",

    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",

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