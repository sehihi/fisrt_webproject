// Popup.js
import React, { useState } from "react";
import "./Popup.css";

const Popup = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (title && content) {
      onSave(title, content);
    }
  };

  return (
    <>
      <div className="popup-overlay" onClick={onClose}></div>
      <div className="popup">
        <h2>이벤트 추가</h2>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div>
          <button onClick={handleSave}>저장</button>
          <button className="cancel" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default Popup;
