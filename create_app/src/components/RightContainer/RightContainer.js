import React from 'react';
import './RightContainer.css';
import Calendar from './Calendar/Calendar';
import ToDoList from './ToDoList/ToDoList';

const RightContainer = () => {
  return (
    <div className="right_container">
      <Calendar />
      <ToDoList />
    </div>
  );
};

export default RightContainer;
