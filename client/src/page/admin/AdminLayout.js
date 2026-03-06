import { NavLink, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa token hoặc user
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // chuyển về login va xóa lịch sử
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🎯 Quiz Admin</h2>

        <nav>
          <NavLink to="/admin" end style={styles.link}>
            📊 DDDashboard
          </NavLink>

          <NavLink to="/admin/users" style={styles.link}>
            👤 Quản lý User
          </NavLink>

          <NavLink to="/admin/questions" style={styles.link}>
            ❓ Quản lý Câu hỏi
          </NavLink>
        </nav>

        {/* Logout button */}
        <button style={styles.logoutBtn} onClick={handleLogout}>
          🚪 Đăng xuất
        </button>
      </div>

      {/* Main */}
      <div style={styles.main}>
        <div style={styles.header}>
          <h3>Admin Dashboard</h3>
          <div>Xin chào, Admin 👋</div>
        </div>

        <div style={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial"
  },

  sidebar: {
    width: "250px",
    background: "linear-gradient(180deg, #1e3c72, #2a5298)",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },

  logo: {
    marginBottom: "30px"
  },

  link: ({ isActive }) => ({
    display: "block",
    padding: "12px 15px",
    marginBottom: "10px",
    borderRadius: "8px",
    textDecoration: "none",
    color: "white",
    backgroundColor: isActive ? "rgba(255,255,255,0.2)" : "transparent"
  }),

  logoutBtn: {
    marginTop: "auto",
    padding: "12px",
    backgroundColor: "#e74c3c",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer"
  },

  main: {
    flex: 1,
    backgroundColor: "#f4f6f9",
    display: "flex",
    flexDirection: "column"
  },

  header: {
    height: "60px",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },

  content: {
    padding: "20px",
    flex: 1,
    overflowY: "auto"
  }
};

export default AdminLayout;