import {
  useState,
  useEffect,
} from "react";

import API from "../services/api";

import MainLayout from "../layouts/MainLayout";

const Expenses = () => {
  const [expenses, setExpenses] =
    useState([]);

  const [totalExpense, setTotalExpense] =
    useState(0);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
  });

  const token = localStorage.getItem(
    "token"
  );

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchExpenses = async () => {
    const res = await API.get(
      "/expenses",
      { headers }
    );

    setExpenses(
      res.data.expenses || []
    );

    setTotalExpense(
      res.data.totalExpense || 0
    );
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

    await API.post(
      "/expenses",
      form,
      { headers }
    );

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
        <h2>💸 Expense Management</h2>

        <div style={styles.card}>
          <h3>Total Expenses</h3>

          <h1>₹{totalExpense}</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >
          <input
            name="title"
            placeholder="Expense Title"
            value={form.title}
            onChange={handleChange}
          />

          <input
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <button type="submit">
            Add Expense
          </button>
        </form>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((e) => (
              <tr key={e._id}>
                <td>{e.title}</td>
                <td>₹{e.amount}</td>
                <td>{e.category}</td>
                <td>
                  {new Date(
                    e.expenseDate
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default Expenses;

const styles = {
  page: {
    padding: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
  },

  form: {
    display: "grid",
    gap: "10px",
    marginBottom: "20px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};