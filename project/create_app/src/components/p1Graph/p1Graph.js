import React from "react";
import "./P1graph.css";
import Graph from "./Graph/Graph";

const P1graph = () => {
  return (
    <div className="left_container">
      {/* Banner와 Banner_2를 가로로 배치 */}
      <div className="row top_row"></div>
      {/* Notice는 독립적인 섹션으로 */}
      <div className="notice_row">
        <Graph />
      </div>
      {/* Weather와 News를 가로로 배치 */}
      <div className="row bottom_row"></div>
    </div>
  );
};

export default P1graph;
