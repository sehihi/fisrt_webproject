const express = require("express");
const mysql = require("mysql");
const app = express();
const path = require("path");
const cors = require("cors");
// MySQL 연결 설정
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1223",
  database: "webproject",
});

app.use(
  cors({
    origin: "*", // 모든 출처 허용 옵션. true 를 써도 된다.
  })
);

const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL 연결
connection.connect();

app.use(express.static(path.join(__dirname, "public")));

// API 엔드포인트: 데이터를 클라이언트로 전달

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/status-data2", (req, res) => {
  const query = `
        SELECT
          COUNT(CASE WHEN \`사유코드설명\` = '0' THEN 1 END) AS 정상,
          COUNT(CASE WHEN \`사유코드설명\` != '0' THEN 1 END) AS 불량
        FROM number5;
      `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("쿼리 오류: " + err);
      res.status(500).send("서버 오류");
      return;
    }

    // 결과 데이터를 JSON 형태로 클라이언트에 전달
    res.json(results[0]);
  });
});
app.get("/fault-details", (req, res) => {
  const query = `
      SELECT \`사유코드설명\`, COUNT(*) AS count
      FROM number5
      WHERE \`사유코드설명\` != '0'
      GROUP BY \`사유코드설명\`;
    `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("쿼리 오류: " + err);
      res.status(500).send("서버 오류");
      return;
    }

    res.json(results);
  });
});
// 클릭한 사유코드 설명에 따른 선종 데이터를 반환하는 API
app.get("/detail-data/:reasonCode", (req, res) => {
  const reasonCode = req.params.reasonCode;
  console.log(reasonCode); // 클릭된 사유코드 설명을 받음
  const query = `
    SELECT \`선종\`, COUNT(*) AS count 
    FROM number5 
    WHERE \`사유코드설명\` = ?
    GROUP BY \`선종\`;
  `;

  connection.query(query, [reasonCode], (err, results) => {
    if (err) {
      console.error("쿼리 오류: " + err);
      res.status(500).send("서버 오류");
      return;
    }

    res.json(results);

    console.log(results); // 데이터를 클라이언트로 전송
  });
});
// 서버 시작
app.listen(3000, () => {
  console.log("서버가 3000번 포트에서 실행 중입니다.");
});

module.exports = appl;
