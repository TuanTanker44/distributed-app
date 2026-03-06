<<<<<<< HEAD:client/src/page/admin/QuestionManager.js
import { useState } from "react";

function QuestionManager() {
  const [questions, setQuestions] = useState([
    {
      id: 29,
      subject_id: 6,
      question_text: "French Revolution year?",
      option_a: "1789",
      option_b: "1804",
      option_c: "1914",
      option_d: "1776",
      correct_answer: "A",
      difficulty: "medium",
      created_by: 1,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
      version: "0"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [newQuestion, setNewQuestion] = useState({
    subject_id: "",
    question_text: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_answer: "A",
    difficulty: "easy"
  });

  const handleSave = () => {
    if (!newQuestion.question_text) return;

    if (editId) {
      setQuestions(
        questions.map(q =>
          q.id === editId
            ? {
                ...q,
                ...newQuestion,
                updated_at: new Date().toLocaleString()
              }
            : q
        )
      );
    } else {
      const newId =
        questions.length > 0
          ? Math.max(...questions.map(q => q.id)) + 1
          : 1;

      const now = new Date().toLocaleString();

      setQuestions([
        ...questions,
        {
          id: newId,
          created_by: 1,
          version: "0",
          created_at: now,
          updated_at: now,
          ...newQuestion
        }
      ]);
    }

    setShowModal(false);
    setEditId(null);
    setNewQuestion({
      subject_id: "",
      question_text: "",
      option_a: "",
      option_b: "",
      option_c: "",
      option_d: "",
      correct_answer: "A",
      difficulty: "easy"
    });
  };

  const handleDelete = id => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleEdit = q => {
    setEditId(q.id);
    setNewQuestion(q);
    setShowModal(true);
  };

  return (
    <div style={styles.container}>
      <h1>📚 Quản lý Câu hỏi</h1>

      <button style={styles.addBtn} onClick={() => setShowModal(true)}>
        + Thêm Câu hỏi
      </button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Câu hỏi</th>
            <th>Đáp án đúng</th>
            <th>Độ khó</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {questions.map(q => (
            <tr key={q.id}>
              <td>{q.id}</td>
              <td>{q.question_text}</td>
              <td>{q.correct_answer}</td>
              <td>{q.difficulty}</td>
              <td>
                <button style={styles.editBtn} onClick={() => handleEdit(q)}>
                  Sửa
                </button>
                <button style={styles.deleteBtn} onClick={() => handleDelete(q.id)}>
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
            <h3>{editId ? "Chỉnh sửa" : "Thêm"} Câu hỏi</h3>

            <input
              style={styles.input}
              placeholder="Subject ID"
              value={newQuestion.subject_id}
              onChange={e =>
                setNewQuestion({ ...newQuestion, subject_id: e.target.value })
              }
            />

            <textarea
              style={styles.input}
              placeholder="Nội dung câu hỏi"
              value={newQuestion.question_text}
              onChange={e =>
                setNewQuestion({ ...newQuestion, question_text: e.target.value })
              }
            />

            <input
              style={styles.input}
              placeholder="Option A"
              value={newQuestion.option_a}
              onChange={e =>
                setNewQuestion({ ...newQuestion, option_a: e.target.value })
              }
            />

            <input
              style={styles.input}
              placeholder="Option B"
              value={newQuestion.option_b}
              onChange={e =>
                setNewQuestion({ ...newQuestion, option_b: e.target.value })
              }
            />

            <input
              style={styles.input}
              placeholder="Option C"
              value={newQuestion.option_c}
              onChange={e =>
                setNewQuestion({ ...newQuestion, option_c: e.target.value })
              }
            />

            <input
              style={styles.input}
              placeholder="Option D"
              value={newQuestion.option_d}
              onChange={e =>
                setNewQuestion({ ...newQuestion, option_d: e.target.value })
              }
            />

            <select
              style={styles.input}
              value={newQuestion.correct_answer}
              onChange={e =>
                setNewQuestion({ ...newQuestion, correct_answer: e.target.value })
              }
            >
              <option value="A">Đáp án A</option>
              <option value="B">Đáp án B</option>
              <option value="C">Đáp án C</option>
              <option value="D">Đáp án D</option>
            </select>

            <select
              style={styles.input}
              value={newQuestion.difficulty}
              onChange={e =>
                setNewQuestion({ ...newQuestion, difficulty: e.target.value })
              }
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <div style={{ marginTop: 15 }}>
              <button style={styles.saveBtn} onClick={handleSave}>
                Lưu
              </button>
              <button style={styles.cancelBtn} onClick={() => setShowModal(false)}>
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
  container: { maxWidth: "1100px", margin: "40px auto" },
  addBtn: {
    padding: "10px 15px",
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: "6px",
    marginBottom: "20px",
    cursor: "pointer"
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
    borderRadius: "4px"
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px"
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
    alignItems: "center"
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "500px"
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
    borderRadius: "5px"
  },
  cancelBtn: {
    backgroundColor: "gray",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px"
  }
};

=======
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

>>>>>>> bb47c3f139b0815a21706be3c0a8a9239e2acd60:client/src/pages/admin/QuestionManager.js
export default QuestionManager;