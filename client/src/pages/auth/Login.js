import { useState } from "react";
import "../../css/auth.css";

async function login(email, password) {
  const res = await fetch("http://localhost:3030/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  localStorage.setItem("access_token", data.access_token);
}

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      setError("Please enter both email/username and password");
      return;
    }

    console.log({
      identifier,
      password,
    });

    // gọi grpc login ở đây
    login(identifier, password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Quiz System</h2>
        <p className="subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username or Email</label>
            <input
              type="text"
              placeholder="Enter username or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="register">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}
