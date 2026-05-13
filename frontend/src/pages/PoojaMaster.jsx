import { useEffect, useState } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

const PoojaMaster = () => {
  const [poojas, setPoojas] = useState([]);

  const [form, setForm] = useState({
    poojaName: "",
    price: "",
    description: "",
  });

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchPoojas = async () => {
    const res = await API.get("/poojas", {
      headers,
    });

    setPoojas(res.data.poojas);
  };

  useEffect(() => {
    fetchPoojas();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/poojas", form, {
      headers,
    });

    alert("Pooja Added");

    setForm({
      poojaName: "",
      price: "",
      description: "",
    });

    fetchPoojas();
  };

  return (
    <MainLayout>
      <div style={styles.page}>
        <h2 style={styles.title}>🛕 Pooja Master</h2>

        {/* FORM CARD */}
        <div style={styles.card}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              name="poojaName"
              placeholder="Pooja Name"
              value={form.poojaName}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              style={styles.input}
            />

            <button type="submit" style={styles.btn}>
              + Add Pooja
            </button>
          </form>
        </div>

        {/* TABLE CARD */}
        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Pooja Name</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Description</th>
              </tr>
            </thead>

            <tbody>
              {poojas.map((p) => (
                <tr key={p._id} style={styles.tr}>
                  <td style={styles.td}>{p.poojaName}</td>
                  <td style={styles.td}>₹{p.price}</td>
                  <td style={styles.td}>{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default PoojaMaster;

/* ================= PREMIUM STYLES ================= */

const styles = {
  page: {
    padding: "20px",
    background: "#f7f3ea",
    minHeight: "100vh",
  },

  title: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#3b2f2f",
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "14px",
    marginBottom: "20px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  },

  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "10px",
  },

  input: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none",
  },

  btn: {
    background: "#6b4f2a",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "500",
  },

  tableCard: {
    background: "#fff",
    padding: "15px",
    borderRadius: "14px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  },

  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 10px",
  },

  th: {
    textAlign: "left",
    padding: "10px",
    color: "#6b4f2a",
    fontSize: "13px",
  },

  tr: {
    background: "#faf7f2",
    borderRadius: "10px",
  },

  td: {
    padding: "12px",
    color: "#3b2f2f",
  },
};