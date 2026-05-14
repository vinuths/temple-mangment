import {
  useState,
  useEffect,
} from "react";

import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

const HallBookings = () => {
  const [bookings, setBookings] =
    useState([]);

  const [form, setForm] =
    useState({
      customerName: "",
      mobile: "",
      functionType: "",
      hallName: "",
      bookingDate: "",
      startTime: "",
      endTime: "",
      amount: "",
      advance: "",
    });

  const token =
    localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchBookings =
    async () => {
      const res = await API.get(
        "/hall-bookings",
        { headers }
      );

      setBookings(
        res.data.bookings || []
      );
    };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    await API.post(
      "/hall-bookings",
      form,
      { headers }
    );

    alert("Booking Created");

    fetchBookings();

    setForm({
      customerName: "",
      mobile: "",
      functionType: "",
      hallName: "",
      bookingDate: "",
      startTime: "",
      endTime: "",
      amount: "",
      advance: "",
    });
  };

  return (
    <MainLayout>
      <div style={styles.page}>
        <h2 style={styles.title}>
          🏛 Hall Booking System
        </h2>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >
          <input
            name="customerName"
            placeholder="Customer Name"
            value={form.customerName}
            onChange={handleChange}
          />

          <input
            name="mobile"
            placeholder="Mobile"
            value={form.mobile}
            onChange={handleChange}
          />

          <input
            name="functionType"
            placeholder="Function Type"
            value={form.functionType}
            onChange={handleChange}
          />

          <input
            name="hallName"
            placeholder="Hall Name"
            value={form.hallName}
            onChange={handleChange}
          />

          <input
            type="date"
            name="bookingDate"
            value={form.bookingDate}
            onChange={handleChange}
          />

          <input
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
          />

          <input
            type="time"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
          />

          <input
            name="amount"
            placeholder="Total Amount"
            value={form.amount}
            onChange={handleChange}
          />

          <input
            name="advance"
            placeholder="Advance Paid"
            value={form.advance}
            onChange={handleChange}
          />

          <button style={styles.btn}>
            Create Booking
          </button>
        </form>

        {/* TABLE */}
        <div style={styles.tableBox}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Hall</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Advance</th>
                <th>Balance</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>
                    {b.customerName}
                  </td>

                  <td>{b.hallName}</td>

                  <td>
                    {new Date(
                      b.bookingDate
                    ).toLocaleDateString()}
                  </td>

                  <td>₹{b.amount}</td>

                  <td>₹{b.advance}</td>

                  <td>
                    ₹{b.balance}
                  </td>

                  <td>{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default HallBookings;

const styles = {
  page: {
    padding: "20px",
  },

  title: {
    marginBottom: "20px",
  },

  form: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(200px,1fr))",

    gap: "10px",

    marginBottom: "20px",
  },

  btn: {
    background: "#6b4f2a",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "10px",
  },

  tableBox: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
  },

  table: {
    width: "100%",
  },
};