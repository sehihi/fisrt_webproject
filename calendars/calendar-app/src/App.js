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

  const handleCheckboxChange = (id) => {
    setTodoTasks(
      todoTasks.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
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

      <div className="todo-list-container" style={{ marginTop: "20px" }}>
        <h2>To-Do List</h2>
        <h3>{formatDateToKorean(selectedDate)}</h3>
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
              </li>
            ))
          ) : (
            <li>오늘의 일정이 없습니다.</li>
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
// cd calendar-app하고 npm start
