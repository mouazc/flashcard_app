import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch categories and flashcards
  const fetchCategoriesAndFlashcards = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8888/flashcard_app/get_categories_and_flashcards.php",
        {
          withCredentials: true,
        }
      );

      if (response.data.status === "success") {
        setCategories(response.data.categories);
        setFlashcards(response.data.flashcards);
      } else {
        setError(response.data.message || "Failed to fetch data.");
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    }
  };

  // Delete card functionality
  const handleDeleteCard = async (cardId) => {
    if (!window.confirm("Are you sure you want to delete this card?")) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8888/flashcard_app/delete_card.php",
        { id: cardId },
        { withCredentials: true } // Include credentials
      );

      if (response.data.status === "success") {
        setFlashcards((prevFlashcards) =>
          prevFlashcards.filter((card) => card.id !== cardId)
        );
      } else {
        alert(response.data.message || "Failed to delete card.");
      }
    } catch (err) {
      console.error("Error deleting card:", err);
      alert("An error occurred while deleting the card.");
    }
  };

  // Filter cards based on category
  const filteredFlashcards = selectedCategory
    ? flashcards.filter((card) => card.category === selectedCategory)
    : flashcards;

  useEffect(() => {
    fetchCategoriesAndFlashcards();
  }, []);

  return (
    <div className="homepage-container">
      <div className="header">
        <h1>UMD Flashcards</h1>
        <div className="menu">
          <button onClick={() => navigate("/add-card")}>ADD CARD</button>
          <button onClick={() => navigate("/practice")}>Practice</button>
        </div>
        <button onClick={() => navigate("/")} className="logout-button">
          LOGOUT
        </button>
      </div>

      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "active" : ""}
          >
            {category}
          </button>
        ))}
        <button
          onClick={() => setSelectedCategory(null)}
          className={!selectedCategory ? "active" : ""}
        >
          All
        </button>
      </div>

      <div className="content">
        <h2>View Flashcards</h2>
        {error && <p className="error-message">{error}</p>}
        {filteredFlashcards.length > 0 ? (
          filteredFlashcards.map((card, index) => (
            <div key={card.id} className="card">
              <div>
                <h3>
                  {index + 1}. {card.question}
                </h3>
                <p>{card.answer}</p>
              </div>
              <div className="card-actions">
                <button
                  onClick={() => handleDeleteCard(card.id)}
                  className="delete-button"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No flashcards found.</p>
        )}
      </div>

      <div className="footer">footer Text</div>
    </div>
  );
};

export default HomePage;
