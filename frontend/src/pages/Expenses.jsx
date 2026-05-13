import { useState, useEffect } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
  });

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchExpenses = async () => {
    const res = await API.get("/expenses", { headers });

    setExpenses(res.data.expenses || []);
    setTotalExpense(res.data.totalExpense || 0);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/expenses", form, { headers });

    alert("Expense Added");

    setForm({
      title: "",
      amount: "",
      category: "",
      description: "",
    });

    fetchExpenses();
  };

  return (
    <MainLayout>
      <div style={styles.page}>
        <h2 style={styles.title}>💸 Expense Management</h2>

        {/* TOP CARD */}
        <div style={styles.topGrid}>
          <div style={styles.card}>
            <h4>Total Expenses</h4>
            <h1 style={styles.amount}>₹{totalExpense}</h1>
          </div>

          <div style={styles.cardSoft}>
            <p>Track temple spending in real time</p>
            <small>All expense records are updated instantly</small>
          </div>
        </div>

        {/* FORM */}
        <div style={styles.formCard}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              name="title"
              placeholder="Expense Title"
              value={form.title}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="category"
              placeholder="Category"
              value={form.category}
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
              + Add Expense
            </button>
          </form>
        </div>

       {/* TABLE */}
<div style={styles.tableCard}>
  <table style={styles.table}>
    <thead>
      <tr>
        <th style={styles.th}>Title</th>
        <th style={styles.th}>Amount</th>
        <th style={styles.th}>Category</th>
        <th style={styles.th}>Description</th> {/* ✅ ADD THIS */}
        <th style={styles.th}>Date</th>
      </tr>
    </thead>

    <tbody>
      {expenses.map((e) => (
        <tr key={e._id} style={styles.tr}>
          <td style={styles.td}>{e.title}</td>
          <td style={styles.td}>₹{e.amount}</td>
          <td style={styles.td}>{e.category}</td>

          {/* ✅ SAFE FALLBACK */}
          <td style={styles.td}>
            {e.description || "-"}
          </td>

          <td style={styles.td}>
            {new Date(e.expenseDate).toLocaleDateString()}
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

export default Expenses;

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

  topGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    marginBottom: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  },

  amount: {
    marginTop: "10px",
    color: "#6b4f2a",
  },

  cardSoft: {
    background: "#faf7f2",
    padding: "20px",
    borderRadius: "14px",
    border: "1px solid #e8dcc9",
  },

  formCard: {
    background: "#fff",
    padding: "15px",
    borderRadius: "14px",
    marginBottom: "20px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
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
};