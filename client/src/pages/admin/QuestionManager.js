import { useState } from "react";

function QuestionManager() {
  const [questions, setQuestions] = useState([
    { id: 1, content: "React là gì?", level: "Dễ" },
    { id: 2, content: "useState dùng để làm gì?", level: "Trung bình" }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    content: "",
    level: "Dễ"
  });

  const [editId, setEditId] = useState(null);

  // Thêm hoặc cập nhật câu hỏi
  const handleSave = () => {
    if (!newQuestion.content) return;

    if (editId) {
      setQuestions(
        questions.map(q =>
          q.id === editId ? { ...q, ...newQuestion } : q
        )
      );
    } else {
      const newId = questions.length + 1;
      setQuestions([...questions, { id: newId, ...newQuestion }]);
    }

    setShowModal(false);
    setNewQuestion({ content: "", level: "Dễ" });
    setEditId(null);
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleEdit = (q) => {
    setEditId(q.id);
    setNewQuestion({ content: q.content, level: q.level });
    setShowModal(true);
  };

  return (
    <div>
      <h1>📚 Quản lý Câu hỏi</h1>

      <button style={styles.addBtn} onClick={() => setShowModal(true)}>
        + Thêm Câu hỏi
      </button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nội dung</th>
            <th>Mức độ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {questions.map(q => (
            <tr key={q.id}>
              <td>{q.id}</td>
              <td>{q.content}</td>
              <td>{q.level}</td>
              <td>
                <button style={styles.editBtn} onClick={() => handleEdit(q)}>Sửa</button>
                <button style={styles.deleteBtn} onClick={() => handleDelete(q.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>{editId ? "Chỉnh sửa" : "Thêm"} Câu hỏi</h3>

            <input
              type="text"
              placeholder="Nhập nội dung câu hỏi"
              value={newQuestion.content}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, content: e.target.value })
              }
              style={styles.input}
            />

            <select
              value={newQuestion.level}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, level: e.target.value })
              }
              style={styles.input}
            >
              <option>Dễ</option>
              <option>Trung bình</option>
              <option>Khó</option>
            </select>

            <div style={{ marginTop: "15px" }}>
              <button style={styles.saveBtn} onClick={handleSave}>Lưu</button>
              <button style={styles.cancelBtn} onClick={() => setShowModal(false)}>Hủy</button>
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

export default QuestionManager;