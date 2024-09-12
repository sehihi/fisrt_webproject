// RightContainer.js
import React, { useState } from "react";
import MyCalendar from "./Calendar/Calendar"; // 변경된 이름
import ToDoList from "./ToDoList/ToDoList";
import "./RightContainer.css";

const RightContainer = () => {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const updateTask = (id, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updatedTask : task))
    );
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id
          ? { ...event, title: updatedTask.title, content: updatedTask.content }
          : event
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  return (
    <div className="right-container">
      <MyCalendar
        events={events}
        setEvents={setEvents}
        setTasks={setTasks}
        setSelectedDate={setSelectedDate}
      />
      <ToDoList
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
    </div>
  );
};

export default RightContainer;
