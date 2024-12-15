import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./component.css"; // Import shared CSS for styling

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8888/flashcard_app/signup.php", {
        email,
        password,
      });

      setMessage(response.data.message);
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  const redirectToLogin = () => {
    navigate("/"); // Redirect to the login page
  };

  return (
    <>
      <div className="header">UMD Flashcards</div>
  
      <div className="login-container">
        <form className="login-form" onSubmit={handleSignup}>
          <h2>Signup</h2>
          {message && <p className="message">{message}</p>}
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
          <button type="submit">Sign Up</button>
          <div className="redirect">
          <p>
            Already have an account?{" "}
            <span className="redirect-link" onClick={redirectToLogin}>
              Login
            </span>
          </p>
        </div>
        </form>
        
      </div>
  
      <div className="footer">© {new Date().getFullYear()} UMD. All rights reserved. Created by Abdulmagid Abdullah, Mouaz Chowdhury & Anika Tahrin 
      </div>
    </>
  );
};

export default Signup;
