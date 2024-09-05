const express = require("express");
const path = require("path");
const app = express();

// EJS 템플릿 엔진 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 정적 파일 제공 (CSS 등)
app.use(express.static(path.join(__dirname, "public")));

// 디데이 계산 함수
function calculateDDay(startDate) {
  const currentDate = new Date(); // 현재 날짜
  const targetDate = new Date(startDate); // 시작일

  // 현재 날짜와 시작일의 차이를 밀리초로 계산
  const diffTime = currentDate - targetDate;

  // 밀리초를 일 수로 변환
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

// 홈 페이지 라우팅
app.get("/", (req, res) => {
  // 디데이 시작일 설정
  const startDate = "2024-05-12";
  const dDay = calculateDDay(startDate);

  // 디데이 값을 EJS 템플릿에 전달
  res.render("home", { dDay });
});

// 서버 시작
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
