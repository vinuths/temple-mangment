import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

const Employees = () => {
  const [employees, setEmployees] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [form, setForm] =
    useState({
      employeeName: "",
      role: "",
      mobile: "",
      salary: "",
      address: "",
      joiningDate: "",
      status: "Active",
    });

  const token =
    localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  /* FETCH */

  const fetchEmployees =
    async () => {
      try {
        const res = await API.get(
          "/employees",
          { headers }
        );

        setEmployees(
          res.data.employees || []
        );
      } catch (err) {
        console.log(err);
      }
    };

  useEffect(() => {
    fetchEmployees();
  }, []);

  /* HANDLE */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  /* SUBMIT */

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await API.post(
        "/employees",
        form,
        { headers }
      );

      alert("Employee Added");

      setForm({
        employeeName: "",
        role: "",
        mobile: "",
        salary: "",
        address: "",
        joiningDate: "",
        status: "Active",
      });

      fetchEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  /* SEARCH */

  const filteredEmployees =
    employees.filter((e) =>
      `${e.employeeName} ${e.role} ${e.mobile}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <MainLayout>
      <div style={styles.page}>
        {/* HEADER */}

        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>
              👨‍💼 Employee Management
            </h2>

            <p style={styles.subtitle}>
              Temple staff management
              system
            </p>
          </div>
        </div>

        {/* SEARCH */}

        <div style={styles.topBar}>
          <input
            placeholder="Search employee..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={styles.search}
          />
        </div>

        {/* FORM */}

        <div style={styles.card}>
          <form
            onSubmit={handleSubmit}
            style={styles.form}
          >
            <input
              name="employeeName"
              placeholder="Employee Name"
              value={
                form.employeeName
              }
              onChange={
                handleChange
              }
              style={styles.input}
            />

            <input
              name="role"
              placeholder="Role"
              value={form.role}
              onChange={
                handleChange
              }
              style={styles.input}
            />

            <input
              name="mobile"
              placeholder="Mobile"
              value={form.mobile}
              onChange={
                handleChange
              }
              style={styles.input}
            />

            <input
              name="salary"
              placeholder="Salary"
              value={form.salary}
              onChange={
                handleChange
              }
              style={styles.input}
            />

            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={
                handleChange
              }
              style={styles.input}
            />

            <input
              type="date"
              name="joiningDate"
              value={
                form.joiningDate
              }
              onChange={
                handleChange
              }
              style={styles.input}
            />

            <select
              name="status"
              value={form.status}
              onChange={
                handleChange
              }
              style={styles.input}
            >
              <option>
                Active
              </option>

              <option>
                Inactive
              </option>
            </select>

            <button
              type="submit"
              style={styles.btn}
            >
              + Add Employee
            </button>
          </form>
        </div>

        {/* TABLE */}

        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>
                  Employee
                </th>

                <th style={styles.th}>
                  Role
                </th>

                <th style={styles.th}>
                  Mobile
                </th>

                <th style={styles.th}>
                  Salary
                </th>

                <th style={styles.th}>
                  Joining
                </th>

                <th style={styles.th}>
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map(
                (e) => (
                  <tr
                    key={e._id}
                    style={styles.tr}
                  >
                    <td
                      style={styles.td}
                    >
                      {
                        e.employeeName
                      }
                    </td>

                    <td
                      style={styles.td}
                    >
                      {e.role}
                    </td>

                    <td
                      style={styles.td}
                    >
                      {e.mobile}
                    </td>

                    <td
                      style={styles.td}
                    >
                      ₹{e.salary}
                    </td>

                    <td
                      style={styles.td}
                    >
                      {new Date(
                        e.joiningDate
                      ).toLocaleDateString()}
                    </td>

                    <td
                      style={styles.td}
                    >
                      <span
                        style={
                          styles.status
                        }
                      >
                        {e.status}
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Employees;

/* PREMIUM UI */

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
    marginBottom: "20px",
  },

  search: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #ddd",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "18px",
    marginBottom: "25px",
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

  tableCard: {
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
    background: "#e8f5e9",
    color: "#2e7d32",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
  },
};