import { useState } from "react";
import { useNavigate } from "react-router-dom";

async function getSubjects() {
  const accessToken = localStorage.getItem("access_token");

  const subjectsRes = await fetch("http://localhost:3030/api/user/subjects", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await subjectsRes.json();
  if (!subjectsRes.ok) {
    throw new Error(data.message || "Failed to fetch subjects");
  }

  const subjectNames = data.map((s) => s.name);

  return { subjects: subjectNames };
}

function CreateQuiz() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    subject: "",
    difficulty: "",
    questionCount: 5,
    time: 10,
  });
  const [error, setError] = useState("");

  const [subjectNames, setSubjectNames] = useState([]);

  useState(() => {
    getSubjects().then((data) => setSubjectNames(data.subjects));
  }, []);

  console.log(subjectNames);
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleStart = () => {
    if (!filters.subject || !filters.difficulty) {
      setError("Vui lòng chọn đầy đủ môn học và độ khó!");
      return;
    }

    setError("");
    navigate("/user/quiz", { state: filters });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🎯 Tạo Bài Quiz</h2>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.formGroup}>
          <label>Môn học</label>

          <select name="subject" onChange={handleChange} style={styles.input}>
            <option value="">-- Chọn môn --</option>

            {subjectNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label>Độ khó</label>
          <select
            name="difficulty"
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">-- Chọn độ khó --</option>
            <option value="easy">Dễ</option>
            <option value="medium">Trung bình</option>
            <option value="hard">Khó</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label>Số câu hỏi</label>
          <input
            type="number"
            name="questionCount"
            min="1"
            max="50"
            value={filters.questionCount}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Thời gian (phút)</label>
          <input
            type="number"
            name="time"
            min="1"
            max="120"
            value={filters.time}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <button style={styles.button} onClick={handleStart}>
          🚀 Bắt đầu làm bài
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#f4f6f9",
  },
  card: {
    width: "400px",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "8px",
    marginTop: "5px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
};

export default CreateQuiz;
