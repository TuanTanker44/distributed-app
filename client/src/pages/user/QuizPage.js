import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const filters = location.state;

  const questions = [
    {
      id: 1,
      content: "React là gì?",
      options: ["Thư viện", "Ngôn ngữ", "Hệ điều hành"],
      correct: "Thư viện"
    },
    {
      id: 2,
      content: "useState dùng để làm gì?",
      options: ["Quản lý state", "Gọi API", "CSS"],
      correct: "Quản lý state"
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(filters?.time * 60 || 600);
  const [finished, setFinished] = useState(false);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setFinished(true);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correct) score++;
    });
    return score;
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (finished) {
    return (
      <div style={styles.result}>
        <h2>🎉 Hoàn thành bài quiz!</h2>
        <h3>
          Điểm: {calculateScore()} / {questions.length}
        </h3>
        <button onClick={() => navigate("/user/history")}>
          Xem lịch sử
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span>
            Câu {currentQuestion + 1} / {questions.length}
          </span>
          <span style={styles.timer}>⏱ {formatTime(timeLeft)}</span>
        </div>

        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progress,
              width: `${((currentQuestion + 1) / questions.length) * 100}%`
            }}
          />
        </div>

        <h3>{questions[currentQuestion].content}</h3>

        <div style={styles.options}>
          {questions[currentQuestion].options.map((opt, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(opt)}
              style={{
                ...styles.optionBtn,
                backgroundColor:
                  answers[currentQuestion] === opt
                    ? "#3498db"
                    : "#ecf0f1",
                color:
                  answers[currentQuestion] === opt
                    ? "white"
                    : "black"
              }}
            >
              {opt}
            </button>
          ))}
        </div>

        <div style={styles.navButtons}>
          <button
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
          >
            ⬅ Trước
          </button>

          {currentQuestion < questions.length - 1 ? (
            <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
              Tiếp ➡
            </button>
          ) : (
            <button onClick={handleSubmit}>Nộp bài</button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "30px"
  },
  card: {
    width: "600px",
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px"
  },
  timer: {
    color: "#e74c3c",
    fontWeight: "bold"
  },
  progressBar: {
    height: "8px",
    backgroundColor: "#ecf0f1",
    borderRadius: "5px",
    marginBottom: "15px"
  },
  progress: {
    height: "100%",
    backgroundColor: "#3498db",
    borderRadius: "5px"
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "15px"
  },
  optionBtn: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer"
  },
  navButtons: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between"
  },
  result: {
    textAlign: "center",
    marginTop: "50px"
  }
};

export default QuizPage;