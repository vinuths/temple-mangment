import { useEffect, useState, useMemo } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

const PoojaAnalytics = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchAnalytics = async () => {
    try {
      const res = await API.get("/dashboard/pooja-analytics", {
        headers,
      });

      setData(res.data.analytics);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  /* ================= FILTER (UI ONLY) ================= */

  const filteredData = useMemo(() => {
    let result = data;

    if (search) {
      result = result.filter((item) =>
        (item._id || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (filter === "high") {
      result = result.filter(
        (i) => i.totalRevenue > 5000
      );
    }

    if (filter === "low") {
      result = result.filter(
        (i) => i.totalRevenue <= 5000
      );
    }

    return result;
  }, [data, search, filter]);

  return (
    <MainLayout>
      <div style={styles.page}>
        <h2 style={styles.title}>
          📊 Pooja Analytics
        </h2>

        {/* SEARCH + FILTER */}
        <div style={styles.topBar}>
          <input
            placeholder="Search pooja..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={styles.search}
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            style={styles.select}
          >
            <option value="all">All</option>
            <option value="high">
              High Revenue
            </option>
            <option value="low">
              Low Revenue
            </option>
          </select>
        </div>

        {/* TABLE */}
        <div style={styles.tableBox}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>
                  Pooja Name
                </th>
                <th style={styles.th}>
                  Total Tickets
                </th>
                <th style={styles.th}>
                  Total Revenue
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} style={styles.tr}>
                  <td style={styles.td}>
                    {item._id}
                  </td>
                  <td style={styles.td}>
                    {item.totalTickets}
                  </td>
                  <td style={styles.td}>
                    <span style={styles.revenue}>
                      ₹{item.totalRevenue}
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

export default PoojaAnalytics;

/* ================= THEME (MATCHED TO YOUR SYSTEM) ================= */

const styles = {
  page: {
    padding: "20px",
    background: "#f7f3ea",
    minHeight: "100vh",
  },

  title: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#3b2f2f",
    marginBottom: "15px",
  },

  topBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
    flexWrap: "wrap",
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
    background: "#fff",
  },

  tableBox: {
    background: "#fff",
    padding: "14px",
    borderRadius: "14px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
  },

  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 8px",
    fontSize: "14px",
  },

  th: {
    textAlign: "left",
    padding: "10px",
    color: "#6b4f2a",
    fontWeight: "600",
    fontSize: "13px",
  },

  tr: {
    background: "#faf7f2",
  },

  td: {
    padding: "10px",
    color: "#3b2f2f",
  },

  revenue: {
    fontWeight: "600",
    color: "#1e7e34",
  },
};