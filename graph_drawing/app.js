const express = require("express");
const mysql = require("mysql");
const app = express();
const path = require("path");
// MySQL 연결 설정
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1223",
  database: "webproject",
});

// MySQL 연결
connection.connect();

app.use(express.static(path.join(__dirname, "public")));

// API 엔드포인트: 데이터를 클라이언트로 전달
app.get("/data", (req, res) => {
  const query = "SELECT * FROM number5"; // 원하는 테이블에서 데이터 조회
  connection.query(query, (err, results) => {
    if (err) {
      console.error("쿼리 오류: " + err);
      res.status(500).send("서버 오류");
      return;
    }
    res.json(results); // JSON 형식으로 데이터 반환
  });
});

// 서버 시작
app.listen(3000, () => {
  console.log("서버가 3000번 포트에서 실행 중입니다.");
});
