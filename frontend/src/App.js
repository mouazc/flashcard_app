import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import HomePage from "./components/HomePage";
import AddCard from "./utils/AddCard";
import PracticePage from "./utils/PracticePage";
import Layout from "./components/Layout";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/add-card" element={<AddCard />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/" element={<Layout />}/>
      </Routes>
    </Router>
  );
};

export default App;
