import React, { useState } from 'react';
import './Menu.css';
import shiLogo from './public/shi.png';

const Menu = ({ setActiveMenu }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const menuItems = ["Menu1", "Menu2", "Menu3", "Menu4", "Menu5"];

  return (
    <div className="menu_container">
      <div className="logo">
        <img src={shiLogo} alt="SHI Logo" width="150" height="auto" />
      </div>
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setActiveMenu(item)}  // 메뉴 클릭 시 상태 변경
            style={{
              cursor: 'pointer',
              backgroundColor: hoveredIndex === index ? "white" : "#013E8F",
              color: hoveredIndex === index ? "#333" : "white",
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
