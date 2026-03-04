import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./page/admin/AdminLayout";
import Dashboard from "./page/admin/Dashboard";
import UserManager from "./page/admin/UserManager";
import QuestionManager from "./page/admin/QuestionManager";
import UserLayout from "./page/user/UserLayout";
import CreateQuiz from "./page/user/CreateQuiz";
import QuizPage from "./page/user/QuizPage";
import History from "./page/user/History";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserManager />} />
          <Route path="questions" element={<QuestionManager />} />
        </Route>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<CreateQuiz />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="history" element={<History />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;