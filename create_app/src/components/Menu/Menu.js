import "./Menu.css";

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Menu = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    "HOME",
    "P1 공정현황",
    "P2 공정현황",
    "P3 공정현황",
    "용접불량율",
  ];
  const paths = ["/main", "/menu1", "/menu2", "/menu3", "/menu4"];

  useEffect(() => {
    // 현재 경로에 따라 선택된 메뉴 인덱스 설정
    const currentPath = location.pathname;
    const selectedIndex = paths.findIndex((path) => path === currentPath);
    setSelectedIndex(selectedIndex);
  }, [location]);

  const handleMenuClick = (item, index) => {
    setSelectedIndex(index); // 선택된 메뉴 인덱스 업데이트
    navigate(paths[index]);
  };

  return (
    <div className="menu_container">
      <div className="logo">
        <img src="/path/to/logo.jpg" alt="Logo" />
      </div>
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleMenuClick(item, index)}
            style={{
              cursor: "pointer",
              backgroundColor: selectedIndex === index ? "white" : "#013E8F",
              color: selectedIndex === index ? "#333" : "white",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
