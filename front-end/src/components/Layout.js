import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../App.css"; // Using App.css for styling

const Layout = () => {
  const navigate = useNavigate();

  return (
    <div className="layout-container">
      {/* Header */}
      <div className="header">
        <h1>UMD Flashcards</h1>
        <div className="menu">
          <button onClick={() => navigate("/homepage")}>Homepage</button>
          <button onClick={() => navigate("/add-card")}>Add Card</button>
          <button onClick={() => navigate("/practice")}>Practice</button>
        </div>
        <button onClick={() => navigate("/")} className="logout-button">Logout</button>
      </div>

      {/* Dynamic Content Area */}
      <div className="main-content">
        <Outlet /> {/* This renders the child components */}
      </div>

      {/* Footer */}
      <div className="footer">Footer Text</div>
    </div>
  );
};

export default Layout;
