import { useState, useEffect } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [poojas, setPoojas] = useState([]);
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [poojaFilter, setPoojaFilter] =
    useState("");
const [editOpen, setEditOpen] = useState(false);
const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    poojaName: "",
    devoteeName: "",
    mobile: "",
    date: "",
    price: "",
    quantity: 1,
    paymentMethod: "Cash",
    paymentStatus: "Paid",
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

      alert("Ticket Created Successfully");

      setForm({
        poojaName: "",
        devoteeName: "",
        mobile: "",
        date: "",
        price: "",
        quantity: 1,
        paymentMethod: "Cash",
        paymentStatus: "Paid",
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
      "width=700,height=700"
    );

    win.document.write(`
      <html>
        <head>
          <title>Temple Receipt</title>

          <style>
            body{
              font-family:Arial;
              padding:30px;
              background:#f7f3ea;
            }

            .receipt{
              background:#fff;
              border-radius:16px;
              padding:30px;
              border:1px solid #ddd;
            }

            h2{
              color:#6b4f2a;
              text-align:center;
            }

            p{
              margin:10px 0;
              font-size:15px;
            }

            .total{
              margin-top:20px;
              font-size:20px;
              font-weight:bold;
              color:#3b2f2f;
            }
          </style>
        </head>

        <body>
          <div class="receipt">
            <h2>🏛 Temple Ticket Receipt</h2>

            <p><b>Receipt No:</b> ${
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

            <p><b>Quantity:</b> ${
              ticket.quantity
            }</p>

            <p><b>Payment Method:</b> ${
              ticket.paymentMethod
            }</p>

            <p><b>Status:</b> ${
              ticket.paymentStatus
            }</p>

            <div class="total">
              Total Amount :
              ₹${ticket.totalAmount}
            </div>
          </div>
        </body>
      </html>
    `);

    win.print();
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this ticket?")) return;

  try {
    await API.delete(`/tickets/${id}`, { headers });
    fetchTickets();
  } catch (error) {
    console.log(error);
    alert("Delete failed");
  }
};

const openEdit = (t) => {
  setEditId(t._id);

  setForm({
    poojaName: t.poojaName,
    devoteeName: t.devoteeName,
    mobile: t.mobile,
    date: t.date?.split("T")[0],
    price: t.price,
    quantity: t.quantity,
    paymentMethod: t.paymentMethod,
    paymentStatus: t.paymentStatus,
  });

  setEditOpen(true);
};

const updateTicket = async (e) => {
  e.preventDefault();

  try {
    await API.put(`/tickets/${editId}`, form, { headers });

    alert("Updated Successfully");

    setEditOpen(false);
    setEditId(null);

    fetchTickets();
  } catch (error) {
    console.log(error);
    alert("Update failed");
  }
};
  /* ================= FILTER ================= */

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      `${t.devoteeName} ${t.mobile} ${t.receiptNo}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      !statusFilter ||
      t.paymentStatus === statusFilter;

    const matchesPooja =
      !poojaFilter ||
      t.poojaName === poojaFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPooja
    );
  });

  /* ================= STATS ================= */

  const totalRevenue = tickets.reduce(
    (acc, item) =>
      acc + (item.totalAmount || 0),
    0
  );

  const totalTickets = tickets.length;

  return (
    <MainLayout>
      <div style={styles.page}>
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>
              🎟 Enterprise Ticket System
            </h2>

            <p style={styles.subtitle}>
              Premium temple ticket management
            </p>
          </div>
        </div>

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

        {/* FILTERS */}

        <div style={styles.filterRow}>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            style={styles.input}
          >
            <option value="">
              All Status
            </option>

            <option value="Paid">
              Paid
            </option>

            <option value="Pending">
              Pending
            </option>
          </select>

          <select
            value={poojaFilter}
            onChange={(e) =>
              setPoojaFilter(e.target.value)
            }
            style={styles.input}
          >
            <option value="">
              All Poojas
            </option>

            {poojas.map((p) => (
              <option
                key={p._id}
                value={p.poojaName}
              >
                {p.poojaName}
              </option>
            ))}
          </select>
        </div>

        {/* STATS */}

        <div style={styles.statsGrid}>
          <div style={styles.statsCard}>
            <h3>{totalTickets}</h3>
            <p>Total Tickets</p>
          </div>

          <div style={styles.statsCard}>
            <h3>₹{totalRevenue}</h3>
            <p>Total Revenue</p>
          </div>
        </div>

        {/* FORM */}

        <div style={styles.formCard}>
          <form
            onSubmit={handleSubmit}
            style={styles.form}
          >
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

            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              style={styles.input}
            >
              <option>
                Cash
              </option>

              <option>
                UPI
              </option>

              <option>
                Card
              </option>
            </select>

            <select
              name="paymentStatus"
              value={form.paymentStatus}
              onChange={handleChange}
              style={styles.input}
            >
              <option>
                Paid
              </option>

              <option>
                Pending
              </option>
            </select>

            <button
              type="submit"
              style={styles.btn}
            >
              + Create Ticket
            </button>
          </form>
        </div>

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
                  Payment
                </th>

                <th style={styles.th}>
                  Method
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
                    ₹{t.totalAmount}
                  </td>

                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.status,
                        background:
                          t.paymentStatus ===
                          "Paid"
                            ? "#e6f4ea"
                            : "#fff4e5",
                        color:
                          t.paymentStatus ===
                          "Paid"
                            ? "#1e7e34"
                            : "#ff9800",
                      }}
                    >
                      {t.paymentStatus}
                    </span>
                  </td>

                  <td style={styles.td}>
                    {t.paymentMethod}
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
                    <button
  style={styles.editBtn}
  onClick={() => openEdit(t)}
>
  Edit
</button>

<button
  style={styles.deleteBtn}
  onClick={() => handleDelete(t._id)}
>
  Delete
</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {editOpen && (
  <div style={styles.modalOverlay}>
    <div style={styles.modal}>
      <h3 style={{ marginBottom: "10px" }}>Edit Ticket</h3>

      <form onSubmit={updateTicket} style={styles.form}>

        <input
          name="poojaName"
          value={form.poojaName}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="devoteeName"
          value={form.devoteeName}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          style={styles.input}
        />

        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          style={styles.input}
        >
          <option>Cash</option>
          <option>UPI</option>
          <option>Card</option>
        </select>

        <select
          name="paymentStatus"
          value={form.paymentStatus}
          onChange={handleChange}
          style={styles.input}
        >
          <option>Paid</option>
          <option>Pending</option>
        </select>

        <button type="submit" style={styles.btn}>
          Update
        </button>

        <button
          type="button"
          onClick={() => setEditOpen(false)}
          style={styles.deleteBtn}
        >
          Close
        </button>

      </form>
    </div>
  </div>
)}
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

  header: {
    marginBottom: "20px",
  },

  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#3b2f2f",
  },

  subtitle: {
    color: "#6b7280",
    marginTop: "5px",
  },

  topBar: {
    marginBottom: "15px",
  },

  search: {
    padding: "12px",
    width: "100%",
    borderRadius: "12px",
    border: "1px solid #ddd",
  },

  filterRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
    marginBottom: "20px",
  },

  statsCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow:
      "0 6px 18px rgba(0,0,0,0.05)",
  },

  formCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "18px",
    marginBottom: "20px",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.05)",
  },

  form: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",
    gap: "12px",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
  },

  btn: {
    background:
      "linear-gradient(135deg,#6b4f2a,#3b2f2f)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "12px",
    cursor: "pointer",
    fontWeight: "600",
  },

  tableBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "18px",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.05)",
  },

  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 10px",
  },

  th: {
    textAlign: "left",
    padding: "12px",
    color: "#6b4f2a",
    fontSize: "13px",
  },

  tr: {
    background: "#faf7f2",
  },

  td: {
    padding: "14px",
    color: "#3b2f2f",
  },

  status: {
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
  },

  printBtn: {
    background:
      "linear-gradient(135deg,#6b4f2a,#3b2f2f)",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "10px",
    cursor: "pointer",
  },
  editBtn: {
  marginLeft: "6px",
  background: "#2196f3",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
},

deleteBtn: {
  marginLeft: "6px",
  background: "#e53935",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
},

modalOverlay: {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
},

modal: {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  width: "500px",
},
};
