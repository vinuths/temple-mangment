import { useState, useEffect } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  const [form, setForm] = useState({
    donorName: "",
    mobile: "",
    amount: "",
    donationType: "",
  });

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  /* ================= FETCH ================= */

  const fetchDonations = async () => {
    try {
      const res = await API.get("/donations", { headers });
      setDonations(res.data.donations || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  /* ================= HANDLE ================= */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/donations", form, { headers });

      alert("Donation Added");

      setForm({
        donorName: "",
        mobile: "",
        amount: "",
        donationType: "",
      });

      fetchDonations();
    } catch (err) {
      console.log(err);
      alert("Failed to add donation");
    }
  };

  /* ================= FILTER ================= */

  const filteredDonations = donations.filter((d) => {
    const matchSearch =
      `${d.donorName} ${d.mobile} ${d.receiptNo}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchType =
      filterType === "" || d.donationType === filterType;

    return matchSearch && matchType;
  });

  const uniqueTypes = [
    ...new Set(donations.map((d) => d.donationType)),
  ];

  return (
    <MainLayout>
      <div style={styles.page}>
        <h2 style={styles.title}>💰 Donation Management</h2>

        {/* SEARCH + FILTER */}
        <div style={styles.topBar}>
          <input
            placeholder="Search donor, mobile, receipt..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={styles.select}
          >
            <option value="">All Types</option>
            {uniqueTypes.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="donorName"
            placeholder="Donor Name"
            value={form.donorName}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="mobile"
            placeholder="Mobile"
            value={form.mobile}
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
            name="donationType"
            placeholder="Donation Type"
            value={form.donationType}
            onChange={handleChange}
            style={styles.input}
          />

          <button type="submit" style={styles.btn}>
            + Add Donation
          </button>
        </form>

        {/* TABLE */}
        <div style={styles.tableBox}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Receipt</th>
                <th style={styles.th}>Donor</th>
                <th style={styles.th}>Mobile</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Type</th>
              </tr>
            </thead>

            <tbody>
              {filteredDonations.map((d) => (
                <tr key={d._id} style={styles.tr}>
                  <td style={styles.td}>{d.receiptNo}</td>
                  <td style={styles.td}>{d.donorName}</td>
                  <td style={styles.td}>{d.mobile}</td>
                  <td style={styles.td}>₹{d.amount}</td>
                  <td style={styles.td}>
                    <span style={styles.badge}>
                      {d.donationType}
                    </span>
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

export default Donations;

/* ================= THEME STYLES ================= */

const styles = {
  page: {
    padding: "20px",
    background: "#f7f3ea",
    minHeight: "100vh",
  },

  title: {
    fontSize: "20px",
    marginBottom: "15px",
    color: "#3b2f2f",
    fontWeight: "600",
  },

  topBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },

  search: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },

  select: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },

  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "10px",
    marginBottom: "20px",
    background: "#fff",
    padding: "15px",
    borderRadius: "14px",
  },

  input: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },

  btn: {
    background: "#6b4f2a",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "10px",
    cursor: "pointer",
  },

  tableBox: {
    background: "#fff",
    padding: "16px",
    borderRadius: "14px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
  },

  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 10px",
    fontSize: "14px",
  },

  th: {
    textAlign: "left",
    padding: "10px 12px",
    color: "#6b4f2a",
    fontWeight: "600",
    fontSize: "13px",
  },

  tr: {
    background: "#faf7f2",
  },

  td: {
    padding: "12px",
    color: "#3b2f2f",
  },

  badge: {
    background: "#e6f4ea",
    color: "#1e7e34",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
  },
};