// Calendar.js
import React, { useState } from "react";
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/ko"; // 한글 로케일 추가
import "./Calendar.css";
import Popup from "../Popup"; // Popup 컴포넌트

const localizer = momentLocalizer(moment);

const CustomToolbar = ({ date, onNavigate }) => {
  const [currentDate, setCurrentDate] = useState(date);

  const handlePrevious = () => {
    const newDate = moment(currentDate).subtract(1, "month").toDate();
    setCurrentDate(newDate);
    onNavigate(newDate);
  };

  const handleNext = () => {
    const newDate = moment(currentDate).add(1, "month").toDate();
    setCurrentDate(newDate);
    onNavigate(newDate);
  };

  return (
    <div className="custom-toolbar">
      <span className="current-date">
        {moment(currentDate).format("YYYY년 MM월")}
      </span>
      <div className="nav-buttons">
        <button onClick={handlePrevious} className="nav-button">
          {"<"}
        </button>
        <button onClick={handleNext} className="nav-button">
          {">"}
        </button>
      </div>
    </div>
  );
};

const MyCalendar = ({ events, setEvents, setTasks, setSelectedDate }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDateState] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSelectSlot = ({ start }) => {
    setSelectedDateState(start);
    setSelectedDate(start);
    setShowPopup(true);
  };

  const addEvent = (title, content) => {
    const newEvent = {
      id: Date.now(),
      start: new Date(selectedDate),
      end: new Date(selectedDate),
      title,
      content,
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: newEvent.id, date: selectedDate, title, content, completed: false },
    ]);
    setShowPopup(false);
  };

  const handleNavigate = (date) => {
    setCurrentDate(date);
  };

  return (
    <div>
      <BigCalendar
        localizer={localizer}
        events={events}
        defaultView={Views.MONTH}
        style={{ height: 452, width: 478 }}
        selectable
        onSelectSlot={handleSelectSlot}
        components={{
          toolbar: (props) => (
            <CustomToolbar
              {...props}
              date={currentDate}
              onNavigate={handleNavigate}
            />
          ),
        }}
        views={{ month: true }}
        date={currentDate}
        onNavigate={handleNavigate}
      />
      {showPopup && (
        <Popup onClose={() => setShowPopup(false)} onSave={addEvent} />
      )}
    </div>
  );
};

export default MyCalendar;
