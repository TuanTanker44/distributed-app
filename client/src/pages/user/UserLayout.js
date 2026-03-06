<<<<<<< HEAD:client/src/page/user/UserLayout.js
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function UserLayout() {

  const navigate = useNavigate();

  const handleLogout = () => {
    // xóa dữ liệu đăng nhập
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // chuyển về login
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div>
          <h2 style={styles.logo}>🎯 Quiz User</h2>

          <nav>
            <NavLink to="/user" end style={styles.link}>
              📝 Tạo Quiz
            </NavLink>

            <NavLink to="/user/history" style={styles.link}>
              📜 Lịch sử
            </NavLink>
          </nav>
        </div>

        {/* Logout */}
        <button style={styles.logoutBtn} onClick={handleLogout}>
          🚪 Đăng xuất
        </button>
      </div>

      {/* Main Area */}
      <div style={styles.main}>

        {/* Header */}
        <div style={styles.header}>
          <h3>User Dashboard</h3>
          <div>Xin chào 👋</div>
        </div>

        {/* Content */}
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
    fontFamily: "Arial, sans-serif"
  },

  sidebar: {
    width: "230px",
    background: "linear-gradient(180deg, #2c3e50, #4ca1af)",
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

=======
import { NavLink, Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <div style={styles.container}>
      
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🎯 Quiz User</h2>

        <nav>
          <NavLink to="/user" end style={styles.link}>
            📝 Tạo Quiz
          </NavLink>

          <NavLink to="/user/history" style={styles.link}>
            📜 Lịch sử
          </NavLink>
        </nav>
      </div>

      {/* Main Area */}
      <div style={styles.main}>
        {/* Header */}
        <div style={styles.header}>
          <h3>User Dashboard</h3>
          <div>Xin chào 👋</div>
        </div>

        {/* Content */}
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
    fontFamily: "Arial, sans-serif"
  },
  sidebar: {
    width: "230px",
    background: "linear-gradient(180deg, #2c3e50, #4ca1af)",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column"
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
    backgroundColor: isActive ? "rgba(255,255,255,0.2)" : "transparent",
    transition: "0.3s"
  }),
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

>>>>>>> bb47c3f139b0815a21706be3c0a8a9239e2acd60:client/src/pages/user/UserLayout.js
export default UserLayout;