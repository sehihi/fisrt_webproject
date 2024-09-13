import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./Graph2.css";
const Graph2 = () => {
  // 차트 렌더링을 위한 ref 생성 (세 개의 차트)
  const chartRef1 = useRef(null); // n1-p1
  const chartRef2 = useRef(null); // n1-p2
  const chartRef3 = useRef(null); // n1-p3
  const chartRef4 = useRef(null); // fault-details
  const chartRef5 = useRef(null); // fault-details

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
            backgroundColor: darkBlueColors.slice(0, 5), // 파란색 계열 색상
            hoverBackgroundColor: darkBlueColors.slice(0, 5),
          },
        ],
      };

      // 파이 차트 생성
      new Chart(ctx, {
        type: "pie",
        data: chartData,
        options: {
          responsive: false,
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

      const Labels = data.map((item) => item["원인코드"]);
      const Counts = data.map((item) => item["원인코드_갯수"]);

      // 바 차트 데이터 설정
      const chartData = {
        labels: Labels,
        datasets: [
          {
            data: Counts, // 서버에서 받은 데이터
            backgroundColor: [
              "#FF9F40", // Orange
              "#FF8E49",
              "#FF7D53",
              "#FF6C5D",
              "#FF5B67",
              "#FF4A71",
              "#FF397B", // Transition from orange to red
              "#FF6384", // Red
              "#FF7695",
              "#FF8AA6",
              "#FF9EB7",
              "#FFB3C8", // Lighter red to pink
              "#36A2EB", // Blue
              "#4BA9EC",
              "#60B0ED",
              "#75B7EE",
              "#8ABEEE",
              "#9FC5EF", // Lighter blue
            ],
          },
        ],
      };

      // 바 차트 생성
      new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
          responsive: false,
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
      "http://localhost:3001/n1-p1-g2",
      chartRef1,
      "긴급도 현황"
    );
    fetchDataAndDrawBarChart(
      "http://localhost:3001/n1-p1-g2-2",
      chartRef2,
      "진행상태 현황"
    );
    fetchDataAndDrawBarChart(
      "http://localhost:3001/n1-p1-g2-3-High",
      chartRef3,
      "상-High : 설계변경현황"
    );
    fetchDataAndDrawBarChart(
      "http://localhost:3001/n1-p1-g2-3-Medium",
      chartRef4,
      "상-Medium : 설계변경현황"
    );
    fetchDataAndDrawBarChart(
      "http://localhost:3001/n1-p1-g2-3-Low",
      chartRef5,
      "상-Low : 설계변경현황"
    );
  }, []);

  return (
    <div className="notice">
      {/* 각각의 차트를 그릴 canvas */}
      <canvas
        ref={chartRef1}
        style={{ width: "100%", height: "100%" }}
      ></canvas>{" "}
      <canvas
        ref={chartRef2}
        style={{ width: "100%", height: "100%" }}
      ></canvas>{" "}
      <canvas
        ref={chartRef3}
        style={{ width: "100%", height: "100%" }}
      ></canvas>{" "}
      <canvas
        ref={chartRef4}
        style={{ width: "100%", height: "100%" }}
      ></canvas>{" "}
      <canvas
        ref={chartRef5}
        style={{ width: "100%", height: "100%" }}
      ></canvas>{" "}
    </div>
  );
};

export default Graph2;
