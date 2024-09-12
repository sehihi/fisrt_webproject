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
// import Graph from "./components/GraphContainer/Graph";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 상태
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
                  <LeftContainer />
                  <RightContainer />
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
