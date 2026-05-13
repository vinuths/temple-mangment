// components/Layout.jsx
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  return (
    <div style={styles.wrapper}>
      <Sidebar />

      <div style={styles.main}>
        <Topbar />
        <div style={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;

const styles = {
  wrapper: {
    display: "flex",
  },

  main: {
    flex: 1,
    marginLeft: "220px",
    minHeight: "100vh",
    background: "#f6f3ee",
  },

  content: {
    padding: "20px",
  },
};