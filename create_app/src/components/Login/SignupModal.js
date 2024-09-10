import React, { useState } from 'react';
import './SignupModal.css';

const SignupModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // 로딩 상태 추가

  const handleSignup = async (e) => {
    e.preventDefault();

    // 필수 체크박스 확인
    if (!isChecked1 || !isChecked2 || !isChecked3) {
      alert('모든 필수 항목에 동의해주세요.');
      return;
    }

    // 비밀번호 확인
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호 길이 확인 (최소 8자리 이상 권장)
    if (password.length < 8) {
      alert('비밀번호는 최소 8자 이상이어야 합니다.');
      return;
    }

    // 서버에 회원가입 요청 중임을 표시
    setIsSubmitting(true);

    // 회원가입 요청
    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.text();
      if (response.ok) {
        alert(result); // "회원가입 성공"
      } else {
        alert(result || '회원가입 실패');
      }
    } catch (error) {
      alert('회원가입 중 오류 발생');
    } finally {
      setIsSubmitting(false); // 요청이 끝난 후 로딩 상태 해제
    }

    onClose(); // 모달 닫기
  };

  return (
    <div className="signup-modal">
      <div className="signup-modal-content">
        <h2>회원가입</h2>
        <form onSubmit={handleSignup}>
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
          <label>
            비밀번호 확인:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          {/* 동의 체크박스 */}
          <label>
            <input
              type="checkbox"
              checked={isChecked1}
              onChange={(e) => setIsChecked1(e.target.checked)}
            />
            (필수) 만 14세 이상입니다.
          </label>
          <label>
            <input
              type="checkbox"
              checked={isChecked2}
              onChange={(e) => setIsChecked2(e.target.checked)}
            />
            (필수) 서비스 이용약관에 동의합니다.
          </label>
          <label>
            <input
              type="checkbox"
              checked={isChecked3}
              onChange={(e) => setIsChecked3(e.target.checked)}
            />
            (필수) 개인정보 수집/이용에 동의합니다.
          </label>

          {/* 제출 버튼 */}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '회원가입 중...' : '회원가입'}
          </button>
        </form>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default SignupModal;
