import { useEffect, useState } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

const Users = () => {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    username: "",
    password: "",
    permissions: [],
  });

  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const modulesList = [
    "dashboard",
    "tickets",
    "reports",
    "poojaAnalytics",
    "poojaMaster",
    "donations",
    "expenses",
    "inventory",
    "hallBookings",
    "employees",
  ];

  /* ================= FETCH USERS ================= */

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users", { headers });
      setUsers(res.data.users || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= HANDLE PERMISSIONS ================= */

  const handlePermission = (module) => {
    if (form.permissions.includes(module)) {
      setForm({
        ...form,
        permissions: form.permissions.filter((p) => p !== module),
      });
    } else {
      setForm({
        ...form,
        permissions: [...form.permissions, module],
      });
    }
  };

  /* ================= CREATE USER ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/users/create", form, { headers });

      alert("Staff Created Successfully");

      setForm({
        name: "",
        mobile: "",
        username: "",
        password: "",
        permissions: [],
      });

      fetchUsers();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed");
    }
  };

  /* ================= OPEN EDIT ================= */
const fetchPermissions = async (userId) => {
  try {
    const res = await API.get(`/users/permissions/${userId}`, { headers });
    return res.data.permissions?.modules || [];
  } catch (err) {
    console.log(err);
    return [];
  }
};
 const openEdit = async (user) => {
  setEditId(user._id);

  const permissions = await fetchPermissions(user._id); // 🔥 REAL FIX

  setForm({
    name: user.name,
    mobile: user.mobile,
    username: user.username,
    password: "",
    permissions: permissions, // ✅ FIXED
  });

  setEditOpen(true);
};
  /* ================= UPDATE USER ================= */

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/users/${editId}`, form, { headers });

      alert("User Updated");

      setEditOpen(false);
      setEditId(null);

      setForm({
        name: "",
        mobile: "",
        username: "",
        password: "",
        permissions: [],
      });

      fetchUsers();
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  /* ================= DELETE USER ================= */

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await API.delete(`/users/${id}`, { headers });
      fetchUsers();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <MainLayout>
      <div style={styles.page}>
        <h2 style={styles.title}>👨‍💼 User Management</h2>

        {/* FORM (UNCHANGED) */}
        <div style={styles.card}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              value={form.mobile}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
              required
            />

            {/* PERMISSIONS (UNCHANGED UI) */}
            <div style={styles.permissionsBox}>
              <h4>Module Permissions</h4>

              <div style={styles.permissionsGrid}>
                {modulesList.map((module) => (
                  <label key={module} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={form.permissions.includes(module)}
                      onChange={() => handlePermission(module)}
                    />
                    {module}
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" style={styles.btn}>
              + Create Staff
            </button>
          </form>
        </div>

        {/* USERS TABLE (ONLY ACTION ADDED) */}
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Mobile</th>
                <th style={styles.th}>Username</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id} style={styles.tr}>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.mobile}</td>
                  <td style={styles.td}>{user.username}</td>
                  <td style={styles.td}>{user.role}</td>

                  <td style={styles.td}>
                    <button
                      onClick={() => openEdit(user)}
                      style={styles.editBtn}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteUser(user._id)}
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

        {/* EDIT MODAL (NEW ONLY, UI SIMPLE BUT SAFE) */}
        {editOpen && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h3>Edit User</h3>

              <form onSubmit={updateUser} style={styles.form}>
                <input
                  name="name"
                  value={form.name}
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
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  style={styles.input}
                />

                {/* PERMISSIONS EDIT (IMPORTANT FIX INCLUDED) */}
                <div style={styles.permissionsGrid}>
                  {modulesList.map((module) => (
                    <label key={module} style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={form.permissions.includes(module)}
                        onChange={() => handlePermission(module)}
                      />
                      {module}
                    </label>
                  ))}
                </div>

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
    </MainLayout>
  );
};

export default Users;

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: "20px",
    background: "#f7f3ea",
    minHeight: "100vh",
  },

  title: {
    fontSize: "28px",
    color: "#3b2f2f",
    marginBottom: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "18px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.05)",
  },

  form: {
    display: "grid",
    gap: "15px",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
  },

  permissionsBox: {
    marginTop: "10px",
  },

  permissionsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",
    gap: "10px",
    marginTop: "10px",
  },

  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#faf7f2",
    padding: "10px",
    borderRadius: "10px",
  },

  btn: {
    background:
      "linear-gradient(135deg,#6b4f2a,#3b2f2f)",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "14px",
    background: "#faf7f2",
    color: "#6b4f2a",
  },

  tr: {
    borderBottom: "1px solid #eee",
  },

  td: {
    padding: "14px",
    color: "#3b2f2f",
  },
};