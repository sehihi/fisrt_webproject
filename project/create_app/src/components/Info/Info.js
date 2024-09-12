import React from 'react';
import './Info.css';

const Info = () => {
  return (
    <div className="info_container">
      <div className="info_box">
        <img src="/path/to/profile.jpg" alt="Profile" className="profile_img" />
        <div className="info_text"> {/* 이름과 부서를 감싸는 div */}
          <div className="name">홍길동</div>
          <div className="depart">스마트연구센터</div>
        </div>
        
      </div>
    </div>
  );
};

export default Info;
