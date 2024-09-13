import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // 수정된 import
import "./App.css";
import Menu from "./components/Menu/Menu";
import Info from "./components/Info/Info";
import LeftContainer from "./components/LeftContainer/LeftContainer";
import RightContainer from "./components/RightContainer/RightContainer";
import Login from "./components/Login/Login"; // 로그인 컴포넌트 임포트
import Popup from "./components/RightContainer/Popup";
import P1graph from "./components/P1graph/P1graph";
// import Graph from "./components/GraphContainer/Graph";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 상태
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  //  달력 기능 받는 부분

  //**************************************************** */
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

  // ****************************************************

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
        {/* 새로고침 하면 밖으로 나가짐 */}
        {/* <Route
          path="/main"
          element={
            isAuthenticated ? (
              <div className="app_container">
                <Menu setActiveMenu={() => { }} />
                <div className="main_content">
                  <Info />
                  <div className="content_container">
                    <LeftContainer />
                    <RightContainer />
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        /> */}

        {/* 메인 페이지, 로그인 되어야만 접근 가능 */}
        <Route
          path="/main"
          element={
            <div className="app_container">
              <Menu setActiveMenu={() => {}} />
              <div className="main_content">
                <Info />
                <div className="content_container">
                  <LeftContainer />
                  <RightContainer />
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
          }
        />

        {/* 메뉴 1 페이지 , 로그인 되어야만 접근 가능 */}
        <Route
          path="/menu1"
          element={
            <div className="app_container">
              <Menu setActiveMenu={() => {}} />
              <div className="main_content">
                <Info />
                <div className="content_container">
                  <P1graph />
                </div>
              </div>
            </div>
          }
        />

        {/* 메뉴 2 페이지 , 로그인 되어야만 접근 가능 */}
        <Route
          path="/menu2"
          element={
            <div className="app_container">
              <Menu setActiveMenu={() => {}} />
              <div className="main_content">
                <Info />
                <div className="content_container">
                  <LeftContainer />
                  <RightContainer />
                </div>
              </div>
            </div>
          }
        />

        {/* 메뉴 3 페이지 , 로그인 되어야만 접근 가능 */}
        <Route
          path="/menu3"
          element={
            <div className="app_container">
              <Menu setActiveMenu={() => {}} />
              <div className="main_content">
                <Info />
                <div className="content_container">
                  <LeftContainer />
                  <RightContainer />
                </div>
              </div>
            </div>
          }
        />

        {/* 메뉴 4 페이지 , 로그인 되어야만 접근 가능 */}
        <Route
          path="/menu4"
          element={
            <div className="app_container">
              <Menu setActiveMenu={() => {}} />
              <div className="main_content">
                <Info />
                <div className="content_container">
                  <LeftContainer />
                  <RightContainer />
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
