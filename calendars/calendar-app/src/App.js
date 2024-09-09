import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todoTasks, setTodoTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  // Handle date click on calendar
  const handleDateClick = (arg) => {
    setSelectedDate(new Date(arg.dateStr)); // Update selected date
    const title = prompt("일정 제목을 입력하세요:");
    if (title) {
      const newEvent = { title, date: arg.dateStr };
      setEvents([...events, newEvent]);
      setTodoTasks([
        ...todoTasks,
        { ...newEvent, id: new Date().getTime(), checked: false },
      ]);
    }
  };

  // Handle checkbox change to edit tasks
  const handleCheckboxChange = (id) => {
    setTodoTasks(
      todoTasks.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  // Update the task title
  const handleUpdateTask = () => {
    if (editingTaskId && newTitle) {
      const updatedTasks = todoTasks.map((task) =>
        task.id === editingTaskId ? { ...task, title: newTitle } : task
      );
      setTodoTasks(updatedTasks);

      const updatedEvents = events.map((event) =>
        event.title ===
          todoTasks.find((task) => task.id === editingTaskId).title &&
        event.date === selectedDate.toISOString().split("T")[0]
          ? { ...event, title: newTitle }
          : event
      );
      setEvents(updatedEvents);

      setEditingTaskId(null);
      setNewTitle("");
    }
  };

  // Filter tasks for the selected date
  const todayTasks = todoTasks.filter(
    (task) => task.date === selectedDate.toISOString().split("T")[0]
  );

  // Format date to Korean
  const formatDateToKorean = (date) => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  // Remove checked tasks
  const handleRemoveCheckedTasks = () => {
    setTodoTasks(todoTasks.filter((task) => !task.checked));
    setEvents(
      events.filter(
        (event) =>
          !todoTasks.find((task) => task.checked && task.title === event.title)
      )
    );
  };

  // Handle event click (optional)
  const handleEventClick = (info) => {
    alert("Event: " + info.event.title);
  };

  // Navigate to previous date
  const handlePrevDate = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  // Navigate to next date
  const handleNextDate = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  return (
    <div className="App">
      <div className="fullcalendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick} // Optional: Handle event click
          locales={[koLocale]}
          locale="ko"
        />
      </div>

      <div className="todo-list-container" style={{ marginTop: "20px" }}>
        <h2>To-Do List</h2>
        <h3>{formatDateToKorean(selectedDate)}</h3>
        <button onClick={handlePrevDate}>이전 날짜</button>
        <button onClick={handleNextDate}>다음 날짜</button>

        {/* Edit Task UI */}
        {editingTaskId && (
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="새로운 제목 입력"
            />
            <button onClick={handleUpdateTask}>일정 변경하기</button>
          </div>
        )}

        <ul>
          {todayTasks.length > 0 ? (
            todayTasks.map((task) => (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.checked}
                  onChange={() => handleCheckboxChange(task.id)}
                />
                {task.checked ? <s>{task.title}</s> : task.title}
                <button
                  onClick={() => {
                    setEditingTaskId(task.id);
                    setNewTitle(task.title);
                  }}
                >
                  수정
                </button>
              </li>
            ))
          ) : (
            <li>일정이 없습니다.</li>
          )}
        </ul>
        {todayTasks.length > 0 && (
          <button onClick={handleRemoveCheckedTasks}>
            삭제된 일정 적용하기
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
