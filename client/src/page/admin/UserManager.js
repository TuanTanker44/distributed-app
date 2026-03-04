import { useState } from "react";

function UserManager() {
  const [users, setUsers] = useState([
    { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com" },
    { id: 2, name: "Trần Văn B", email: "b@gmail.com" }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: ""
  });

  const [editId, setEditId] = useState(null);

  // Thêm hoặc cập nhật user
  const handleSave = () => {
    if (!newUser.name || !newUser.email) return;

    if (editId) {
      setUsers(
        users.map(user =>
          user.id === editId ? { ...user, ...newUser } : user
        )
      );
    } else {
      const newId = users.length + 1;
      setUsers([...users, { id: newId, ...newUser }]);
    }

    setShowModal(false);
    setNewUser({ name: "", email: "" });
    setEditId(null);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setNewUser({ name: user.name, email: user.email });
    setShowModal(true);
  };

  return (
    <div>
      <h1>👥 Quản lý User</h1>

      <button style={styles.addBtn} onClick={() => setShowModal(true)}>
        + Thêm User
      </button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button style={styles.editBtn} onClick={() => handleEdit(user)}>
                  Sửa
                </button>
                <button style={styles.deleteBtn} onClick={() => handleDelete(user.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>{editId ? "Chỉnh sửa User" : "Thêm User"}</h3>

            <input
              type="text"
              placeholder="Nhập tên"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({ ...newUser, name: e.target.value })
              }
              style={styles.input}
            />

            <input
              type="email"
              placeholder="Nhập email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              style={styles.input}
            />

            <div style={{ marginTop: "15px" }}>
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
  addBtn: {
    padding: "10px 15px",
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "15px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white"
  },
  editBtn: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "5px 10px",
    marginRight: "5px",
    borderRadius: "4px",
    cursor: "pointer"
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "400px"
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "10px"
  },
  saveBtn: {
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    padding: "8px 12px",
    marginRight: "10px",
    borderRadius: "5px",
    cursor: "pointer"
  },
  cancelBtn: {
    backgroundColor: "gray",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default UserManager;