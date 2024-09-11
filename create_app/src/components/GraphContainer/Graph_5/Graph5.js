import React, { useEffect } from "react";
import Chart from "chart.js/auto";

const Graph5 = () => {
  useEffect(() => {
    let myPieChart;
    let detailPieChart;
    let detailChart;

    // 차트를 생성하는 함수
    const createCharts = async () => {
      try {
        console.log("status-data2 요청보냄");
        const response = await fetch("http://localhost:3001/status-data2");
        const data = await response.json();
        const ctx = document.getElementById("myPieChart").getContext("2d");

        const chartData = {
          labels: ["정상", "불량"],
          datasets: [
            {
              data: [data.정상, data.불량],
              backgroundColor: ["#36A2EB", "#FF6384"],
              hoverBackgroundColor: ["#36A2EB", "#FF6384"],
            },
          ],
        };

        myPieChart = new Chart(ctx, {
          type: "pie",
          data: chartData,
          options: {
            responsive: false,
            onClick: async (evt, activeElements) => {
              if (activeElements.length > 0) {
                const index = activeElements[0].index;
                const label = myPieChart.data.labels[index];

                if (label === "불량") {
                  const detailResponse = await fetch(
                    "http://localhost:3001/fault-details"
                  );
                  const detailData = await detailResponse.json();
                  const detailCtx = document
                    .getElementById("detailPieChart")
                    .getContext("2d");
                  const labels = detailData.map((item) => item["사유코드설명"]);
                  const counts = detailData.map((item) => item.count);

                  if (detailPieChart) detailPieChart.destroy();

                  detailPieChart = new Chart(detailCtx, {
                    type: "pie",
                    data: {
                      labels: labels,
                      datasets: [
                        {
                          data: counts,
                          backgroundColor: [
                            "#FF9F40",
                            "#FF6384",
                            "#36A2EB",
                            "#4BC0C0",
                            "#4BC0FF",
                          ],
                        },
                      ],
                    },
                    options: {
                      responsive: false,
                      onClick: (evt, activeElements) => {
                        if (activeElements.length > 0) {
                          const index = activeElements[0].index;
                          const clickedLabel =
                            detailPieChart.data.labels[index];
                          loadDetailChart(clickedLabel);
                        }
                      },
                    },
                  });

                  document.getElementById("detailPieChart").style.display =
                    "block";
                }
              }
            },
          },
        });
      } catch (error) {
        console.error("Error creating charts:", error);
      }
    };

    const loadDetailChart = async (reasonCode) => {
      try {
        const response = await fetch(
          `http://localhost:3001/detail-data/${reasonCode}`
        );
        const detailData = await response.json();
        const detailCtx = document
          .getElementById("detailChart")
          .getContext("2d");
        const detailLabels = detailData.map((item) => item["선종"]);
        const detailCounts = detailData.map((item) => item.count);

        if (detailChart) {
          detailChart.destroy();
        }

        detailChart = new Chart(detailCtx, {
          type: "bar",
          data: {
            labels: detailLabels,
            datasets: [
              {
                data: detailCounts,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              },
            ],
          },
          options: {
            responsive: false,
          },
        });

        document.getElementById("detailChart").style.display = "block";
      } catch (error) {
        console.error("Error loading detail chart:", error);
      }
    };

    createCharts();

    // Clean up function to destroy charts on component unmount
    return () => {
      if (myPieChart) myPieChart.destroy();
      if (detailPieChart) detailPieChart.destroy();
      if (detailChart) detailChart.destroy();
    };
  }, []);

  return (
    <div>
      <h1>사유코드 설명 파이 차트</h1>
      <canvas id="myPieChart" style={{ width: "50%", height: "50%" }}></canvas>
      <canvas
        id="detailPieChart"
        style={{ display: "none", width: "50%", height: "50%" }}
      ></canvas>
      <canvas
        id="detailChart"
        style={{ display: "none", width: "50%", height: "50%" }}
      ></canvas>
    </div>
  );
};

export default Graph5;
