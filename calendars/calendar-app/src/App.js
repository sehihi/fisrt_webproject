// App.js
import React, { useState } from "react";
import Calendar from "./Calendar";
import ToDoList from "./ToDoList";
import ReactModal from "react-modal";
import "./App.css";

ReactModal.setAppElement("#root");

function App() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todoTasks, setTodoTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
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
    setModalContent("");
  };

  const handleModalSubmit = () => {
    if (modalTitle) {
      const newEvent = {
        title: modalTitle,
        content: modalContent,
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

  const handleTaskUpdate = (id, newTitle, newContent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id
          ? { ...event, title: newTitle, content: newContent }
          : event
      )
    );
    setTodoTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, title: newTitle, content: newContent }
          : task
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
      <Calendar events={events} handleDateClick={handleDateClick} />

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="일정 입력"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>일정 제목과 내용을 입력하세요</h2>
        <input
          type="text"
          placeholder="제목"
          value={modalTitle}
          onChange={(e) => setModalTitle(e.target.value)}
        />
        <textarea
          placeholder="내용"
          value={modalContent}
          onChange={(e) => setModalContent(e.target.value)}
        />
        <div className="modal-button-group">
          <button onClick={handleModalSubmit}>저장</button>
          <button className="close-button" onClick={handleModalClose}>
            닫기
          </button>
        </div>
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
