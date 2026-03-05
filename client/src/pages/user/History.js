import { useState } from "react";

function History() {
  const [history, setHistory] = useState([
    { id: 1, subject: "Toán", score: 8, total: 10, date: "2026-03-01" },
    { id: 2, subject: "IT", score: 9, total: 10, date: "2026-03-03" },
    { id: 3, subject: "Tiếng Anh", score: 5, total: 10, date: "2026-03-04" }
  ]);

  const getScoreColor = (score, total) => {
    const percent = (score / total) * 100;
    if (percent >= 80) return "#2ecc71";
    if (percent >= 50) return "#f39c12";
    return "#e74c3c";
  };

  const handleDelete = (id) => {
    setHistory(history.filter(item => item.id !== id));
  };

  return (
    <div>
      <h2 style={styles.title}>📜 Lịch sử làm bài</h2>

      {history.length === 0 ? (
        <p>Chưa có lịch sử làm bài.</p>
      ) : (
        history.map(item => (
          <div key={item.id} style={styles.card}>
            <div style={styles.left}>
              <h3>{item.subject}</h3>
              <p>📅 {item.date}</p>
            </div>

            <div style={styles.right}>
              <span
                style={{
                  ...styles.score,
                  backgroundColor: getScoreColor(item.score, item.total)
                }}
              >
                {item.score}/{item.total}
              </span>

              <button
                style={styles.deleteBtn}
                onClick={() => handleDelete(item.id)}
              >
                Xóa
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  title: {
    marginBottom: "20px"
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  left: {},
  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  score: {
    padding: "8px 12px",
    borderRadius: "20px",
    color: "white",
    fontWeight: "bold"
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default History;