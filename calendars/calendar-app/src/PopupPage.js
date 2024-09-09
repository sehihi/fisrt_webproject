import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";

const PopupPage = () => {
  const location = useLocation();
  const [modalContent, setModalContent] = useState("");
  const [events, setEvents] = useState([]);

  // Extract the date from the query parameter
  const queryParams = new URLSearchParams(location.search);
  const selectedDate = queryParams.get("date");

  const handleAddEvent = () => {
    if (modalContent) {
      const newEvent = {
        title: modalContent,
        date: selectedDate,
      };
      setEvents([...events, newEvent]);
      window.close(); // Close the popup window
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>일정 추가</h2>
      <input
        type="text"
        placeholder="일정 제목을 입력하세요"
        value={modalContent}
        onChange={(e) => setModalContent(e.target.value)}
      />
      <button onClick={handleAddEvent}>추가</button>
    </div>
  );
};

export default PopupPage;
