// layouts/MainLayout.jsx
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const MainLayout = ({ children }) => {
  return (
    <div style={styles.wrapper}>
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* RIGHT CONTENT */}
      <div style={styles.main}>
        <Topbar />
        <div style={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#f6f3ee",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  content: {
    padding: "20px",
  },
};