import { useState, useEffect } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [poojas, setPoojas] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    poojaName: "",
    devoteeName: "",
    mobile: "",
    date: "",
    price: "",
    quantity: 1,
  });

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  /* ================= FETCH TICKETS ================= */

  const fetchTickets = async () => {
    try {
      const res = await API.get("/tickets", {
        headers,
      });

      setTickets(res.data.tickets || []);
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= FETCH POOJAS ================= */

  const fetchPoojas = async () => {
    try {
      const res = await API.get("/poojas", {
        headers,
      });

      setPoojas(res.data.poojas || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchPoojas();
  }, []);

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= CREATE TICKET ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tickets", form, {
        headers,
      });

      alert("Ticket Created");

      setForm({
        poojaName: "",
        devoteeName: "",
        mobile: "",
        date: "",
        price: "",
        quantity: 1,
      });

      fetchTickets();
    } catch (error) {
      console.log(error);
      alert("Failed to create ticket");
    }
  };

  /* ================= PRINT ================= */

  const printTicket = (ticket) => {
    const win = window.open(
      "",
      "",
      "width=600,height=600"
    );

    win.document.write(`
      <html>
        <head>
          <title>Receipt</title>

          <style>
            body {
              font-family: Arial;
              padding: 20px;
            }

            .box {
              border: 1px solid #000;
              padding: 20px;
              border-radius: 10px;
            }

            h2 {
              text-align: center;
            }
          </style>
        </head>

        <body>
          <div class="box">
            <h2>🏛 Temple Receipt</h2>

            <p><b>Receipt:</b> ${
              ticket.receiptNo
            }</p>

            <p><b>Pooja:</b> ${
              ticket.poojaName
            }</p>

            <p><b>Devotee:</b> ${
              ticket.devoteeName
            }</p>

            <p><b>Mobile:</b> ${
              ticket.mobile
            }</p>

            <p><b>Date:</b> ${new Date(
              ticket.date
            ).toLocaleDateString()}</p>

            <p><b>Price:</b> ₹${
              ticket.price
            }</p>

            <p><b>Qty:</b> ${
              ticket.quantity
            }</p>

            <hr />

            <h3>
              Total: ₹
              ${
                ticket.price *
                ticket.quantity
              }
            </h3>
          </div>
        </body>
      </html>
    `);

    win.print();
  };

  /* ================= SEARCH FILTER ================= */

  const filteredTickets = tickets.filter((t) =>
    `${t.devoteeName} ${t.mobile} ${t.receiptNo}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div style={styles.page}>
        <h2 style={styles.title}>
          🎟 Enterprise Ticket System
        </h2>

        {/* SEARCH */}
        <div style={styles.topBar}>
          <input
            placeholder="Search by name, mobile, receipt..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={styles.search}
          />
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >
          {/* POOJA DROPDOWN */}
          <select
            name="poojaName"
            value={form.poojaName}
            onChange={(e) => {
              const selected = poojas.find(
                (p) =>
                  p.poojaName ===
                  e.target.value
              );

              setForm({
                ...form,
                poojaName:
                  selected?.poojaName || "",
                price:
                  selected?.price || "",
              });
            }}
            style={styles.input}
          >
            <option value="">
              Select Pooja
            </option>

            {poojas.map((p) => (
              <option
                key={p._id}
                value={p.poojaName}
              >
                {p.poojaName} - ₹{p.price}
              </option>
            ))}
          </select>

          <input
            name="devoteeName"
            placeholder="Devotee Name"
            onChange={handleChange}
            value={form.devoteeName}
            style={styles.input}
          />

          <input
            name="mobile"
            placeholder="Mobile"
            onChange={handleChange}
            value={form.mobile}
            style={styles.input}
          />

          <input
            type="date"
            name="date"
            onChange={handleChange}
            value={form.date}
            style={styles.input}
          />

          {/* AUTO PRICE */}
          <input
            name="price"
            placeholder="Price"
            value={form.price}
            readOnly
            style={styles.input}
          />

          <input
            name="quantity"
            placeholder="Quantity"
            onChange={handleChange}
            value={form.quantity}
            style={styles.input}
          />

          <button
            type="submit"
            style={styles.btn}
          >
            + Create Ticket
          </button>
        </form>

        {/* TABLE */}
        <div style={styles.tableBox}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>
                  Receipt
                </th>

                <th style={styles.th}>
                  Pooja
                </th>

                <th style={styles.th}>
                  Devotee
                </th>

                <th style={styles.th}>
                  Mobile
                </th>

                <th style={styles.th}>
                  Date
                </th>

                <th style={styles.th}>
                  Amount
                </th>

                <th style={styles.th}>
                  Status
                </th>

                <th style={styles.th}>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTickets.map((t) => (
                <tr
                  key={t._id}
                  style={styles.tr}
                >
                  <td style={styles.td}>
                    {t.receiptNo}
                  </td>

                  <td style={styles.td}>
                    {t.poojaName}
                  </td>

                  <td style={styles.td}>
                    {t.devoteeName}
                  </td>

                  <td style={styles.td}>
                    {t.mobile}
                  </td>

                  <td style={styles.td}>
                    {new Date(
                      t.date
                    ).toLocaleDateString()}
                  </td>

                  <td style={styles.td}>
                    ₹
                    {(t.price || 0) *
                      (t.quantity || 1)}
                  </td>

                  <td style={styles.td}>
                    <span style={styles.status}>
                      Paid
                    </span>
                  </td>

                  <td style={styles.td}>
                    <button
                      style={styles.printBtn}
                      onClick={() =>
                        printTicket(t)
                      }
                    >
                      Print
                    </button>
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

export default Tickets;

/* ================= STYLES ================= */

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
    justifyContent: "space-between",
    marginBottom: "15px",
  },

  search: {
    padding: "10px",
    width: "100%",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },

  form: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(180px, 1fr))",
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
    boxShadow:
      "0 6px 18px rgba(0,0,0,0.05)",
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
    borderRadius: "12px",
  },

  td: {
    padding: "12px",
    color: "#3b2f2f",
  },

  status: {
    background: "#e6f4ea",
    color: "#1e7e34",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
  },

  printBtn: {
    background: "#6b4f2a",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};