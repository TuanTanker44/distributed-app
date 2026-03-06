import { useState } from "react";

function UserManager() {
  const [users, setUsers] = useState([
    {
      id: 3,
      username: "teacher01",
      email: "teacher1@example.com",
      role: "USER",
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "USER",
  });

  const [editId, setEditId] = useState(null);

  const handleSave = () => {
    if (!newUser.username || !newUser.email) return;

    if (editId) {
      setUsers(
        users.map((user) =>
          user.id === editId
            ? { ...user, ...newUser, updated_at: new Date().toLocaleString() }
            : user,
        ),
      );
    } else {
      const newId =
        users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

      const now = new Date().toLocaleString();

      setUsers([
        ...users,
        {
          id: newId,
          ...newUser,
          created_at: now,
          updated_at: now,
        },
      ]);
    }

    setShowModal(false);
    setNewUser({ username: "", email: "", role: "USER" });
    setEditId(null);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setNewUser({
      username: user.username,
      email: user.email,
      role: user.role,
    });
    setShowModal(true);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>👥 Quản lý User</h1>

      <button style={styles.addBtn} onClick={() => setShowModal(true)}>
        + Thêm User
      </button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <span
                  style={
                    user.role === "ADMIN" ? styles.adminBadge : styles.userBadge
                  }
                >
                  {user.role}
                </span>
              </td>
              <td>{user.created_at}</td>
              <td>{user.updated_at}</td>
              <td>
                <button style={styles.editBtn} onClick={() => handleEdit(user)}>
                  Sửa
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(user.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>{editId ? "Chỉnh sửa User" : "Thêm User"}</h3>

            <input
              style={styles.input}
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
            />

            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />

            <select
              style={styles.input}
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>

            <div style={styles.modalActions}>
              <button style={styles.saveBtn} onClick={handleSave}>
                Lưu
              </button>
              <button
                style={styles.cancelBtn}
                onClick={() => setShowModal(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "40px auto",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: "20px",
  },
  addBtn: {
    padding: "10px 18px",
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  editBtn: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "6px 12px",
    marginRight: "6px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "10px",
    width: "400px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  modalActions: {
    marginTop: "18px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  saveBtn: {
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cancelBtn: {
    backgroundColor: "gray",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  adminBadge: {
    backgroundColor: "#e74c3c",
    color: "white",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
  },
  userBadge: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
  },
};

export default UserManager;
