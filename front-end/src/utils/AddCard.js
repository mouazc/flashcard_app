import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddCard.css";

const AddCard = () => {
  const navigate = useNavigate(); // Ensure this is at the top level
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  const handleAddCard = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/flashcard_app/add_card.php",
        { category, question, answer },
        { withCredentials: true }
      );

      setMessage(response.data.message);
      if (response.data.status === "success") {
        setCategory("");
        setQuestion("");
        setAnswer("");
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="add-card-page">
      {/* Header */}
      <div className="header">
        <h1>UMD Flashcards</h1>
        <div className="menu">
          <button onClick={() => navigate("/home")}>Homepage</button>
          <button onClick={() => navigate("/practice")}>Practice</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="add-card-container">
          <h2>Add Card</h2>
          {message && (
            <p
              className={`message ${
                message.includes("success") ? "success" : "error"
              }`}
            >
              {message}
            </p>
          )}
          <form onSubmit={handleAddCard}>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category"
              required
            />

            <label htmlFor="question">Question:</label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter question"
              required
            />

            <label htmlFor="answer">Answer:</label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter answer"
              required
            />

            <button type="submit" className="submit-button">
              Add Card
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCard;
