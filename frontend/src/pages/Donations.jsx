import {
  useState,
  useEffect,
} from "react";

import API from "../services/api";

import MainLayout from "../layouts/MainLayout";

const Donations = () => {
  const [donations, setDonations] =
    useState([]);

  const [form, setForm] = useState({
    donorName: "",
    mobile: "",
    amount: "",
    donationType: "",
  });

  const token = localStorage.getItem(
    "token"
  );

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchDonations = async () => {
    const res = await API.get(
      "/donations",
      { headers }
    );

    setDonations(
      res.data.donations || []
    );
  };

  useEffect(() => {
    fetchDonations();
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
      "/donations",
      form,
      { headers }
    );

    alert("Donation Added");

    setForm({
      donorName: "",
      mobile: "",
      amount: "",
      donationType: "",
    });

    fetchDonations();
  };

  return (
    <MainLayout>
      <div style={styles.page}>
        <h2>💰 Donation Management</h2>

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >
          <input
            name="donorName"
            placeholder="Donor Name"
            value={form.donorName}
            onChange={handleChange}
          />

          <input
            name="mobile"
            placeholder="Mobile"
            value={form.mobile}
            onChange={handleChange}
          />

          <input
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
          />

          <input
            name="donationType"
            placeholder="Donation Type"
            value={form.donationType}
            onChange={handleChange}
          />

          <button type="submit">
            Add Donation
          </button>
        </form>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Receipt</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Amount</th>
              <th>Type</th>
            </tr>
          </thead>

          <tbody>
            {donations.map((d) => (
              <tr key={d._id}>
                <td>{d.receiptNo}</td>
                <td>{d.donorName}</td>
                <td>{d.mobile}</td>
                <td>₹{d.amount}</td>
                <td>{d.donationType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default Donations;

const styles = {
  page: {
    padding: "20px",
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