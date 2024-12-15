import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./PracticePage.css";

const PracticePage = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch data when component mounts or location state changes
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
          setIsComplete(false);

          // Set selected category from location state
          if (location.state && location.state.selectedCategory) {
            setSelectedCategory(location.state.selectedCategory);
          } else {
            setSelectedCategory(null);
          }
        } else {
          console.error("Failed to fetch flashcards:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    fetchData();
  }, [location.state]);

  // Filter flashcards based on selected category
  const filteredFlashcards = selectedCategory
    ? flashcards.filter((card) => card.category === selectedCategory)
    : flashcards;

  // Calculate progress and completion status whenever currentIndex or filteredFlashcards change
  useEffect(() => {
    if (filteredFlashcards.length > 0) {
      const newProgress = ((currentIndex + 1) / filteredFlashcards.length) * 100;
      setProgress(newProgress);
    }
  }, [currentIndex, filteredFlashcards]);

  // Handle next card action
  const handleNext = () => {
    // Ensure the last flashcard is displayed before showing the popup
    if (currentIndex < filteredFlashcards.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setShowAnswer(false);
    } else if (currentIndex === filteredFlashcards.length - 1) {
      // Allow the last flashcard to be fully viewed before completing
      setIsComplete(true);
    }
  };

  // Handle previous card action
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setShowAnswer(false);
    }
  };

  // Handle completion pop-up close and navigate back to home page
  const handleCloseComplete = () => {
    navigate("/home");
  };

  // Handle category change and reset states
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
    setProgress(0);
    setIsComplete(false);
  };

  return (
    <div className="practice-page">
      <div className="header">
        <h1>UMD Flashcards</h1>
        <div className="menu">
          <button onClick={() => navigate("/home")}>Homepage</button>
          <button onClick={() => navigate("/add-card")}>Add Card</button>
        </div>
      </div>

      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={selectedCategory === category ? "active" : ""}
          >
            {category}
          </button>
        ))}
        <button
          onClick={() => handleCategoryChange(null)}
          className={!selectedCategory ? "active" : ""}
        >
          All
        </button>
      </div>

      <div className="main-content">
        {isComplete ? (
          <div className="completion-popup">
            <h2>Congratulations!</h2>
            <p>You have completed all flashcards in this set.</p>
            <button onClick={handleCloseComplete}>Close</button>
          </div>
        ) : filteredFlashcards.length > 0 ? (
          <>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="flashcard">
              <h2>{filteredFlashcards[currentIndex].question}</h2>
              {showAnswer && <p>{filteredFlashcards[currentIndex].answer}</p>}
              <button onClick={() => setShowAnswer(!showAnswer)}>
                {showAnswer ? "Hide Answer" : "Show Answer"}
              </button>
            </div>

            <div className="navigation">
              <button onClick={handlePrevious} disabled={currentIndex === 0}>
                Previous
              </button>
              <button onClick={handleNext}>
                {currentIndex === filteredFlashcards.length - 1
                  ? "Complete"
                  : "Next"}
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
