import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import UserManager from "./pages/admin/UserManager";
import QuestionManager from "./pages/admin/QuestionManager";
import UserLayout from "./pages/user/UserLayout";
import CreateQuiz from "./pages/user/CreateQuiz";
import QuizPage from "./pages/user/QuizPage";
import History from "./pages/user/History";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/login" />} />
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
