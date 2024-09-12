import React, { useState } from "react";
import "./Login.css";
import SignupModal from "./SignupModal";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // 로그인 요청
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.text();
      if (response.ok) {
        alert(result); // "로그인 성공"
        setIsAuthenticated(true); // 로그인 성공 시 상태 업데이트
        console.log(setIsAuthenticated);
      } else {
        alert(result); // "로그인 실패" 또는 "사용자가 존재하지 않습니다."
      }
    } catch (error) {
      alert("로그인 중 오류 발생");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box"></div>
      <div className="login-form">
        <form onSubmit={handleLogin}>
          <h2>로그인</h2>
          <label>
            이메일:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            비밀번호:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">로그인</button>
        </form>
        <button className="signup-button" onClick={() => setShowSignup(true)}>
          회원가입
        </button>
      </div>

      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </div>
  );
};

export default Login;
