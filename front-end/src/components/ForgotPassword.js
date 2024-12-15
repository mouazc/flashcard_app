import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./component.css"; // Use the shared CSS file for consistent styling

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/flashcard_app/forgot_password.php",
        {
          email,
          new_password: newPassword,
        }
      );

      setMessage(response.data.message);
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  const redirectToLogin = () => {
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="forgot-password-container">
      <div className="header">UMD Flashcards</div>

      <div className="form-container">
        <h2>Forgot Password</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleForgotPassword}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="new-password">New Password:</label>
          <input
            type="password"
            id="new-password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
        <div className="redirect">
          <p>
            Remembered your password?{" "}
            <span className="redirect-link" onClick={redirectToLogin}>
              Login
            </span>
          </p>
        </div>
      </div>

      <div className="footer">footer Text</div>
    </div>
  );
};

export default ForgotPassword;
