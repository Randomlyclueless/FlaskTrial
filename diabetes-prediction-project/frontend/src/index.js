import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import Predict from "./Predict"; // Make sure this component exists
import "./index.css";

// Get the root element
const container = document.getElementById("root");
const root = createRoot(container); // Create a root

// Render your app
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />{" "}
      <Route path="/predict" element={<Predict />} />{" "}
    </Routes>{" "}
  </Router>
);
