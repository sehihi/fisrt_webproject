import React from "react";
import YouTube from 'react-youtube';
import "./Banner_2.css";

const Banner_2 = () => {
  const opts = {
    height: '100%',  // Banner_2 컨테이너 높이에 맞춤
    width: '100%',  // Banner_2 컨테이너 너비에 맞춤
    playerVars: {
      autoplay: 1,
      controls: 0,  // 컨트롤 숨기기
      modestbranding: 1,  // 유튜브 로고 최소화
      rel: 0,  // 관련 영상 표시하지 않음
      loop: 1,  // 영상 반복 재생
      playlist: 'VPJsiSztUn8'  // loop가 작동하기 위해 필요
    },
  };

  return (
    <div className="banner_2">
      <YouTube videoId="VPJsiSztUn8" opts={opts} />
    </div>
  );
};

export default Banner_2;
