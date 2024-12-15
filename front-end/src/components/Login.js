import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./component.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8888/flashcard_app/login.php",
        { email, password },
        { withCredentials: true }
      );

      if (response.data.status === "success") {
        navigate("/home"); // Redirect to homepage on successful login
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleCreateAccount = () => {
    navigate("/signup"); // Navigate to the signup page
  };

  return (
    <>
      <div className="header">
        UMD Flashcards
      </div>

      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="links">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <button type="submit">Login</button>
          <button
            type="button"
            className="create-account"
            onClick={handleCreateAccount}
          >
            Create Account
          </button>
        </form>
      </div>

      <div className="footer">© {new Date().getFullYear()} UMD. All rights reserved. Created by Abdulmagid Abdullah, Mouaz Chowdhury & Anika Tahrin 
      </div>
    </>
  );
};

export default Login;
