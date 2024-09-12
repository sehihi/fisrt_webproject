import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./Notice.css";
import { Link } from "react-router-dom";
const Notice = () => {
  // 차트 렌더링을 위한 ref 생성 (세 개의 차트)
  const chartRef1 = useRef(null); // n1-p1
  const chartRef2 = useRef(null); // n1-p2
  const chartRef3 = useRef(null); // n1-p3
  const chartRef4 = useRef(null); // fault-details

  // 차트 데이터를 받아서 차트를 그리는 함수
  const fetchDataAndDrawChart = async (url, chartRef, title) => {
    try {
      // 서버에서 데이터 가져오기
      const response = await fetch(url);
      const data = await response.json();

      // 파이 차트를 그릴 컨텍스트
      const ctx = chartRef.current.getContext("2d");

      // 어두운 파랑 계열 색상 설정
      const darkBlueColors = [
        "#1565C0", // 더 밝은 파랑
        "#1E88E5", // 가장 밝은 파랑
        "#0B3D91", // 어두운 파랑

        "#0D47A1", // 약간 밝은 파랑

        "#1976D2", // 밝은 파랑
      ];

      // 파이 차트 데이터 설정
      const chartData = {
        labels: ["근원부서 없음", "근원부서 존재"],
        datasets: [
          {
            data: [data.근원부서_존재하지않음, data.근원부서_존재], // 서버에서 받은 데이터
            backgroundColor: darkBlueColors.slice(0, 2), // 파란색 계열 색상
            hoverBackgroundColor: darkBlueColors.slice(0, 2),
          },
        ],
      };

      // 파이 차트 생성
      new Chart(ctx, {
        type: "pie",
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: title, // 그래프 상단의 제목
              font: {
                size: 18,
              },
            },
            legend: {
              position: "bottom", // 레이블을 그래프 아래에 표시
            },
          },
        },
      });
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생: ", error);
    }
  };

  const fetchDataAndDrawBarChart = async (url, chartRef, title) => {
    try {
      // 서버에서 데이터 가져오기
      const response = await fetch(url);
      const data = await response.json();

      // 바 차트를 그릴 컨텍스트
      const ctx = chartRef.current.getContext("2d");

      const Labels = data.map((item) => item["사유코드설명"]);
      const Counts = data.map((item) => item.count);

      // 바 차트 데이터 설정
      const chartData = {
        labels: Labels,
        datasets: [
          {
            data: Counts, // 서버에서 받은 데이터
            backgroundColor: [
              "#FF9F40",
              "#FF6384",
              "#36A2EB",
              "#4BC0C0",
              "#4BC0FF",
            ],
          },
        ],
      };

      // 바 차트 생성
      new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: title, // 그래프 상단의 제목
              font: {
                size: 18,
              },
            },
            legend: {
              display: false, // legend 표시하지 않음
            },
          },
        },
      });
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생: ", error);
    }
  };

  // useEffect를 사용해 차트를 그리는 로직 실행
  useEffect(() => {
    fetchDataAndDrawChart(
      "http://localhost:3001/n1-p1",
      chartRef1,
      "P1 개정도 현황"
    );
    fetchDataAndDrawChart(
      "http://localhost:3001/n1-p2",
      chartRef2,
      "P2 개정도 현황"
    );
    fetchDataAndDrawChart(
      "http://localhost:3001/n1-p3",
      chartRef3,
      "P3 개정도 현황"
    );
    fetchDataAndDrawBarChart(
      "http://localhost:3001/fault-details",
      chartRef4,
      "용접 불량율 현황"
    );
  }, []);

  return (
    <div className="notice">
      {/* 각각의 차트를 그릴 canvas */}
      <Link to="http://localhost:3000/menu1" className="canvas-link">
        <canvas
          ref={chartRef1}
          style={{ width: "100%", height: "100%" }}
        ></canvas>{" "}
      </Link>
      {/* P1 차트 */}
      <Link to="http://localhost:3000/menu2" className="canvas-link">
        <canvas
          ref={chartRef2}
          style={{ width: "100%", height: "100%" }}
        ></canvas>{" "}
      </Link>
      {/* P2 차트 */}
      <Link to="http://localhost:3000/menu3" className="canvas-link">
        <canvas
          ref={chartRef3}
          style={{ width: "100%", height: "100%" }}
        ></canvas>{" "}
      </Link>
      {/* P3 차트 */}
      <Link to="http://localhost:3000/menu4" className="canvas-link">
        <canvas
          ref={chartRef4}
          style={{ width: "100%", height: "100%" }}
        ></canvas>{" "}
      </Link>
      {/* 사유코드 차트 */}
    </div>
  );
};

export default Notice;
