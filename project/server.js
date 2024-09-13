const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt"); // 비밀번호 암호화
const bodyParser = require("body-parser");
const cors = require("cors"); // CORS 모듈 추가

// app 객체를 먼저 선언
const app = express();

app.use(cors()); // 모든 도메인에서의 요청을 허용
app.use(bodyParser.json()); // JSON 데이터 파싱

// MySQL 연결 설정
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234", // MySQL 비밀번호 입력
  database: "webproject", // 사용할 데이터베이스
});

// MySQL 연결 확인
db.connect((err) => {
  if (err) {
    console.error("MySQL 연결 실패:", err);
    return;
  }
  console.log("MySQL 연결 성공");
});

// 회원가입 API
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO users (email, password) VALUES (?, ?)";
    db.query(query, [email, hashedPassword], (err, result) => {
      if (err) {
        console.error("데이터 삽입 실패:", err);
        return res.status(500).send("회원가입 실패: 데이터베이스 오류");
      }
      console.log("회원가입 성공:", result);
      return res.send("회원가입 성공");
    });
  } catch (error) {
    console.error("회원가입 처리 중 오류 발생:", error);
    res.status(500).send("회원가입 실패: 서버 오류");
  }
});

// 로그인 API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (results.length > 0) {
      // 데이터베이스에서 가져온 해시된 비밀번호와 입력된 비밀번호 비교
      const comparison = await bcrypt.compare(password, results[0].password);
      if (comparison) {
        return res.send("로그인 성공");
      } else {
        return res.status(401).send("로그인 정보가 올바르지 않습니다.");
      }
    } else {
      return res.status(404).send("사용자가 존재하지 않습니다.");
    }
    if (err) {
      console.error("데이터베이스 오류:", err);
      return res.status(500).send("로그인 실패: 데이터베이스 오류");
    }
  });
});

// 뉴스 API - news 테이블에서 최신 뉴스 가져오기
app.get("/news", (req, res) => {
  const sql = "SELECT * FROM news ORDER BY pubDate DESC";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send("데이터 가져오기 오류");
    }
    console.log(result); // 데이터 로그 출력
    res.json(result);
  });
});

// 그래프 데이터 app.get--------------------------------------
//p1 개정도 그래프
app.get("/n1-p1", (req, res) => {
  const query = `
        SELECT 
          COUNT(CASE WHEN \`근원부서\` = '0' THEN 1 END) AS 근원부서_존재하지않음,
          COUNT(CASE WHEN \`근원부서\` != '0' THEN 1 END) AS 근원부서_존재
        FROM number1_p1;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("쿼리 오류: " + err);
      res.status(500).send("서버 오류");
      return;
    }

    // 결과 데이터를 JSON 형태로 클라이언트에 전달
    res.json(results[0]);
  });
});
//p2 개정도 그래프
app.get("/n1-p2", (req, res) => {
  const query = `
        SELECT 
          COUNT(CASE WHEN \`근원부서\` = '0' THEN 1 END) AS 근원부서_존재하지않음,
          COUNT(CASE WHEN \`근원부서\` != '0' THEN 1 END) AS 근원부서_존재
        FROM number1_p2;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("쿼리 오류: " + err);
      res.status(500).send("서버 오류");
      return;
    }

    // 결과 데이터를 JSON 형태로 클라이언트에 전달
    res.json(results[0]);
  });
});
//p3 그래프 개정도
app.get("/n1-p3", (req, res) => {
  const query = `
        SELECT 
          COUNT(CASE WHEN \`근원부서\` = '0' THEN 1 END) AS 근원부서_존재하지않음,
          COUNT(CASE WHEN \`근원부서\` != '0' THEN 1 END) AS 근원부서_존재
        FROM number1_p3;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("쿼리 오류: " + err);
      res.status(500).send("서버 오류");
      return;
    }

    // 결과 데이터를 JSON 형태로 클라이언트에 전달
    res.json(results[0]);
  });
});
// 그래프 시각화 부분 데이터 가져오기
app.get("/status-data2", (req, res) => {
  // console.log("status-data2 요청 들어옴"); // 이 부분 추가
  const query = `
        SELECT
          COUNT(CASE WHEN \`사유코드설명\` = '0' THEN 1 END) AS 정상,
          COUNT(CASE WHEN \`사유코드설명\` != '0' THEN 1 END) AS 불량
        FROM number5;
      `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("쿼리 오류: " + err);
      res.status(500).send("서버 오류");
      return;
    }

    // 결과 데이터를 JSON 형태로 클라이언트에 전달
    res.json(results[0]); // 중복된 응답 제거
  });
});

// 불량 데이터 상세 정보 가져오기
app.get("/fault-details", (req, res) => {
  // console.log("status-data2 경로로 요청이 들어옴");
  const query = `
      SELECT \`사유코드설명\`, COUNT(*) AS count
      FROM number5
      WHERE \`사유코드설명\` != '0'
      GROUP BY \`사유코드설명\`;
    `;

  db.query(query, (err, results) => {
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

  db.query(query, [reasonCode], (err, results) => {
    if (err) {
      console.error("쿼리 오류: " + err);
      res.status(500).send("서버 오류");
      return;
    }

    res.json(results);

    console.log(results); // 데이터를 클라이언트로 전송
  });
});

// 서버 실행
app.listen(3001, () => {
  console.log("서버가 3001 포트에서 실행 중입니다.");
});
