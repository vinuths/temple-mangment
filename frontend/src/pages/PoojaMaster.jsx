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

  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // FETCH
  const fetchPoojas = async () => {
    const res = await API.get("/poojas", { headers });
    setPoojas(res.data.poojas);
  };

  useEffect(() => {
    fetchPoojas();
  }, []);

  // INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/poojas", form, { headers });

    setForm({
      poojaName: "",
      price: "",
      description: "",
    });

    fetchPoojas();
  };

  // OPEN EDIT MODAL
  const openEditModal = (pooja) => {
    setForm({
      poojaName: pooja.poojaName,
      price: pooja.price,
      description: pooja.description,
    });

    setEditId(pooja._id);
    setShowModal(true);
  };

  // UPDATE
  const handleUpdate = async () => {
    await API.put(`/poojas/${editId}`, form, { headers });

    setShowModal(false);
    setEditId(null);

    setForm({
      poojaName: "",
      price: "",
      description: "",
    });

    fetchPoojas();
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this Pooja?")) return;

    await API.delete(`/poojas/${id}`, { headers });
    fetchPoojas();
  };

  return (
    <MainLayout>
      <div style={styles.page}>
        <h2 style={styles.title}>🛕 Pooja Master</h2>

        {/* ADD FORM */}
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

      {/* TABLE */}
<div style={styles.tableCard}>
  <table style={styles.table}>
    <thead>
      <tr style={styles.theadRow}>
        <th style={styles.th}>Pooja Name</th>
        <th style={styles.th}>Price</th>
        <th style={styles.th}>Description</th>
        <th style={styles.th}>Actions</th>
      </tr>
    </thead>

    <tbody>
      {poojas.map((p) => (
        <tr key={p._id} style={styles.tr}>
          <td style={styles.td}>{p.poojaName}</td>
          <td style={styles.td}>₹{p.price}</td>
          <td style={styles.td}>{p.description}</td>

          <td style={styles.td}>
            <button
              onClick={() => openEditModal(p)}
              style={styles.editBtn}
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(p._id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
        {/* ================= EDIT MODAL ================= */}
        {showModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h3>Edit Pooja</h3>

              <input
                name="poojaName"
                value={form.poojaName}
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
                name="description"
                value={form.description}
                onChange={handleChange}
                style={styles.input}
              />

              <div style={styles.modalActions}>
                <button onClick={handleUpdate} style={styles.saveBtn}>
                  Save
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default PoojaMaster;
const styles = {
  page: { padding: "20px", background: "#f7f3ea", minHeight: "100vh" },

  title: { fontSize: "22px", fontWeight: "600", marginBottom: "15px" },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
  },

  form: { display: "flex", gap: "10px", flexWrap: "wrap" },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    flex: 1,
    minWidth: "150px",
  },

  btn: {
    background: "#6b4f2a",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  tableCard: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
  },

  editBtn: {
    marginRight: "8px",
    background: "#2196f3",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "6px",
  },

  deleteBtn: {
    background: "#e53935",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "6px",
  },

  /* MODAL */
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  modalActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  saveBtn: {
    background: "#4caf50",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
  },

  cancelBtn: {
    background: "#999",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
  },
  table: {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 12px",
  fontSize: "14px",
},

theadRow: {
  background: "#f1e9dd",
},

th: {
  textAlign: "left",
  padding: "12px 15px",
  color: "#5a4632",
  fontWeight: "600",
  fontSize: "13px",
  borderBottom: "1px solid #e0d6c8",
},

tr: {
  background: "#faf7f2",
  transition: "0.2s",
},

td: {
  padding: "14px 15px",
  color: "#3b2f2f",
  borderBottom: "1px solid #eee",
},

/* hover effect */
trHover: {
  background: "#f4efe7",
},
};
