import { useState } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

const Reports = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [report, setReport] = useState({
    totalTickets: 0,
    totalRevenue: 0,
    todayTickets: 0,
    todayRevenue: 0,
    dailyData: [],
  });

  /* ================= FETCH REPORT ================= */

  const fetchReport = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        `/reports?from=${fromDate}&to=${toDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("REPORT RESPONSE =>", res.data);

      setReport(
        res.data.data || {
          totalTickets: 0,
          totalRevenue: 0,
          todayTickets: 0,
          todayRevenue: 0,
          dailyData: [],
        }
      );
    } catch (err) {
      console.log(err);

      alert("Failed to fetch report");
    }
  };

  /* ================= EXPORT CSV ================= */

  const exportCSV = () => {
    let csv = [];

    csv.push([
      "Date",
      "Tickets",
      "Revenue",
    ]);

    report.dailyData.forEach((r) => {
      csv.push([
        r.date,
        r.tickets,
        r.revenue,
      ]);
    });

    const csvContent = csv
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "Temple_Report.csv";

    link.click();
  };

  return (
    <MainLayout>
      <div style={styles.page}>
        <h2 style={styles.title}>
          📊 Reports & Analytics
        </h2>

        {/* FILTERS */}
        <div style={styles.filterBox}>
          <input
            type="date"
            value={fromDate}
            onChange={(e) =>
              setFromDate(e.target.value)
            }
            style={styles.input}
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) =>
              setToDate(e.target.value)
            }
            style={styles.input}
          />

          <button
            style={styles.btn}
            onClick={fetchReport}
          >
            Generate Report
          </button>

          <button
            style={styles.exportBtn}
            onClick={exportCSV}
          >
            Export Excel
          </button>
        </div>

        {/* SUMMARY */}
        <div style={styles.grid}>
          <Card
            title="Total Tickets"
            value={report.totalTickets}
          />

          <Card
            title="Total Revenue"
            value={report.totalRevenue}
          />

          <Card
            title="Today Tickets"
            value={report.todayTickets}
          />

          <Card
            title="Today Revenue"
            value={report.todayRevenue}
          />
        </div>

        {/* TABLE */}
        <div style={styles.tableBox}>
          <h3 style={{ marginBottom: "15px" }}>
            📋 Report Details
          </h3>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Tickets</th>
                <th style={styles.th}>Revenue</th>
              </tr>
            </thead>

            <tbody>
              {report.dailyData.length > 0 ? (
                report.dailyData.map((r, i) => (
                  <tr key={i}>
                    <td style={styles.td}>
                      {r.date}
                    </td>

                    <td style={styles.td}>
                      {r.tickets}
                    </td>

                    <td style={styles.td}>
                      ₹{r.revenue}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    No Report Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;

/* ================= CARD ================= */

const Card = ({ title, value }) => (
  <div style={styles.card}>
    <h4>{title}</h4>

    <h2>
      {title.includes("Revenue")
        ? `₹${value || 0}`
        : value || 0}
    </h2>
  </div>
);

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: "20px",
    background: "#f7f3ea",
    minHeight: "100vh",
  },

  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#3b2f2f",
    fontWeight: "600",
  },

  filterBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  btn: {
    background: "#6b4f2a",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  exportBtn: {
    background: "#1e7e34",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginBottom: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.05)",
  },

  tableBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "12px",
    background: "#f2ece2",
    color: "#3b2f2f",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
  },
};