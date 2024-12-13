import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PracticePage.css";

const PracticePage = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8888/flashcard_app/get_categories_and_flashcards.php",
          { withCredentials: true }
        );

        if (response.data.status === "success") {
          setCategories(response.data.categories);
          setFlashcards(response.data.flashcards);
          setProgress(0);
        } else {
          console.error("Failed to fetch flashcards:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    fetchData();
  }, []);

  const filteredFlashcards = selectedCategory
    ? flashcards.filter((card) => card.category === selectedCategory)
    : flashcards;

  const handleNext = () => {
    if (currentIndex < filteredFlashcards.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setShowAnswer(false);
      setProgress(((currentIndex + 1) / filteredFlashcards.length) * 100);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setShowAnswer(false);
      setProgress(((currentIndex - 1) / filteredFlashcards.length) * 100);
    }
  };

  return (
    <div className="practice-page">
      {/* Header */}
      <div className="header">
        <h1>UMD Flashcards</h1>
        <div className="menu">
          <button onClick={() => navigate("/homepage")}>Homepage</button>
          <button onClick={() => navigate("/add-card")}>Add Card</button>
        </div>
      </div>

      {/* Categories */}
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentIndex(0); // Reset index for the new category
              setProgress(0);
            }}
            className={selectedCategory === category ? "active" : ""}
          >
            {category}
          </button>
        ))}
        <button
          onClick={() => {
            setSelectedCategory(null);
            setCurrentIndex(0);
            setProgress(0);
          }}
          className={!selectedCategory ? "active" : ""}
        >
          All
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {filteredFlashcards.length > 0 ? (
          <>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flashcard">
              <h2>{filteredFlashcards[currentIndex].question}</h2>
              {showAnswer && <p>{filteredFlashcards[currentIndex].answer}</p>}
              <button onClick={() => setShowAnswer(!showAnswer)}>
                {showAnswer ? "Hide Answer" : "Show Answer"}
              </button>
            </div>

            <div className="navigation">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === filteredFlashcards.length - 1}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p>No flashcards available for this category. Please add some cards!</p>
        )}
      </div>
    </div>
  );
};

export default PracticePage;
