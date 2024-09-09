import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import PopupPage from "./PopupPage"; // Import the new page

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/popup" element={<PopupPage />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
