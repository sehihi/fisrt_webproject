import React from 'react';
import './LeftContainer.css';
import Banner from './Banner/Banner';
import Notice from './Notice/Notice';
import Weather from './Weather/Weather';
import News from './News/News';
import Banner_2 from './Banner_2/Banner_2';

const LeftContainer = () => {
  return (
    <div className="left_container">
      {/* Banner와 Banner_2를 가로로 배치 */}
      <div className="row top_row">
        <Banner />
        <Banner_2 />
      </div>
      {/* Notice는 독립적인 섹션으로 */}
      <div className="notice_row">
        <Notice />
      </div>
      {/* Weather와 News를 가로로 배치 */}
      <div className="row bottom_row">
        <Weather />
        <News />
      </div>
    </div>
  );
};

export default LeftContainer;
