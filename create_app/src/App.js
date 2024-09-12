import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu/Menu";
import Info from "./components/Info/Info";
import LeftContainer from "./components/LeftContainer/LeftContainer";
import RightContainer from "./components/RightContainer/RightContainer"; // 올바른 경로로 임포트
import Login from "./components/Login/Login";
import Popup from "./components/RightContainer/Popup";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);

  const handleAddTask = (title, content) => {
    setTasks([
      ...tasks,
      { id: Date.now(), date: selectedDate, title, content, completed: false },
    ]);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleUpdateTask = (id, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Router>
      <Routes>
        {/* 로그인 여부에 따라 첫 화면을 결정 */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/main" />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        {/*  공정현황 그래프 페이지  */}
        <Route
          path="/babo"
          element={
            <div className="app_container">
              <Menu setActiveMenu={() => {}} />
              <div className="main_content">
                <Info />
                <div className="content_container"></div>
              </div>
            </div>
          }
        />
        {/* 메인 페이지, 로그인 되어야만 접근 가능 */}
        <Route
          path="/main"
          element={
            isAuthenticated ? (
              <div className="app_container">
                <Menu setActiveMenu={() => {}} />
                <div className="main_content">
                  <Info />
                  <div className="content_container">
                    <LeftContainer />
                    <RightContainer
                      tasks={tasks}
                      selectedDate={selectedDate}
                      onAddTask={handleAddTask}
                      onUpdateTask={handleUpdateTask}
                      onDeleteTask={handleDeleteTask}
                      onDateClick={handleDateClick}
                    />
                  </div>
                </div>
                {showPopup && (
                  <Popup
                    onClose={handleClosePopup}
                    onSave={handleAddTask}
                    selectedDate={selectedDate}
                  />
                )}
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
