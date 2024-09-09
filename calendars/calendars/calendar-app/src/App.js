import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import ReactModal from "react-modal";
import "./App.css";
import ToDoList from "./ToDoList";

ReactModal.setAppElement("#root");

function App() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todoTasks, setTodoTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleDateClick = (arg) => {
    setSelectedDate(new Date(arg.dateStr));
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalTitle("");
  };

  const handleModalSubmit = () => {
    if (modalTitle) {
      const newEvent = {
        title: modalTitle,
        date: selectedDate.toISOString().split("T")[0],
      };
      const newEventWithId = { ...newEvent, id: new Date().getTime() };
      setEvents((prevEvents) => [...prevEvents, newEventWithId]);
      setTodoTasks((prevTasks) => [
        ...prevTasks,
        { ...newEventWithId, checked: false },
      ]);
      handleModalClose();
    }
  };

  const handleTaskDelete = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    setTodoTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleTaskUpdate = (id, newTitle) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, title: newTitle } : event
      )
    );
    setTodoTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  const handleDateChange = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + direction);
    setCurrentDate(newDate.toISOString().split("T")[0]);
  };

  return (
    <div className="App">
      <div className="fullcalendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          locales={[koLocale]}
          locale="ko"
        />
      </div>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="일정 입력"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>일정 제목을 입력하세요</h2>
        <input
          type="text"
          placeholder="제목"
          value={modalTitle}
          onChange={(e) => setModalTitle(e.target.value)}
        />
        <button onClick={handleModalSubmit}>저장</button>
        <button onClick={handleModalClose}>닫기</button>
      </ReactModal>

      <ToDoList
        todoTasks={todoTasks}
        setTodoTasks={setTodoTasks}
        handleTaskDelete={handleTaskDelete}
        handleTaskUpdate={handleTaskUpdate}
        currentDate={currentDate}
        onDateChange={handleDateChange}
      />
    </div>
  );
}

export default App;
