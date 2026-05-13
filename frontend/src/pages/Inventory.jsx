import { useState, useEffect } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

const Inventory = () => {
  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    itemName: "",
    quantity: "",
    unit: "",
    minStock: "",
    price: "",
  });

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchItems = async () => {
    const res = await API.get("/inventory", { headers });
    setItems(res.data.items || []);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/inventory", form, { headers });

    alert("Item Added");

    setForm({
      itemName: "",
      quantity: "",
      unit: "",
      minStock: "",
      price: "",
    });

    fetchItems();
  };

  return (
    <MainLayout>
      <div style={styles.page}>
        <h2 style={styles.title}>📦 Inventory Management</h2>

        {/* FORM */}
        <div style={styles.card}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              name="itemName"
              placeholder="Item Name"
              value={form.itemName}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="quantity"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="unit"
              placeholder="Unit"
              value={form.unit}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="minStock"
              placeholder="Min Stock"
              value={form.minStock}
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

            <button type="submit" style={styles.btn}>
              + Add Item
            </button>
          </form>
        </div>

        {/* TABLE */}
        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Item</th>
                <th style={styles.th}>Qty</th>
                <th style={styles.th}>Unit</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {items.map((i) => (
                <tr key={i._id} style={styles.tr}>
                  <td style={styles.td}>{i.itemName}</td>
                  <td style={styles.td}>{i.quantity}</td>
                  <td style={styles.td}>{i.unit}</td>
                  <td style={styles.td}>₹{i.price}</td>

                  <td style={styles.td}>
                    {i.quantity <= i.minStock ? (
                      <span style={styles.lowStock}>Low Stock</span>
                    ) : (
                      <span style={styles.okStock}>Available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Inventory;

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
  },

  td: {
    padding: "12px",
    color: "#3b2f2f",
  },

  lowStock: {
    color: "red",
    fontWeight: "600",
  },

  okStock: {
    color: "green",
    fontWeight: "600",
  },
};