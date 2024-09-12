import React, { useState } from 'react';
import './Login.css';
import SignupModal from './SignupModal';
import mainIntroVideo from "./main_intro.mp4";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // 로그인 요청
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.text();
      if (response.ok) {
        alert(result); // "로그인 성공"
        setIsAuthenticated(true); // 로그인 성공 시 상태 업데이트
      } else {
        alert(result); // "로그인 실패" 또는 "사용자가 존재하지 않습니다."
      }
    } catch (error) {
      alert('로그인 중 오류 발생');
    }
  };

  return (
    <div className="login-page">
      <video autoPlay loop muted className="background-video" playsInline>
        <source src={mainIntroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="login-form">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <label>
            Username
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="remember_me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember me
          </label>
          <button type="submit" className="login_button">
            Login
          </button>
          <p>
            계정이 없으신가요?{" "}
            <span className="signup-link" onClick={() => setShowSignup(true)}>
              회원가입
            </span>
          </p>
        </form>
      </div>

      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </div>
  );
};

export default Login;
