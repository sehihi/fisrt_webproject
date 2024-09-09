const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt"); // 비밀번호 암호화
const bodyParser = require("body-parser");
const cors = require("cors"); // CORS 모듈 추가
const app = express();

app.use(cors()); // 모든 도메인에서의 요청을 허용
app.use(bodyParser.json()); // JSON 데이터 파싱

// MySQL 연결 설정
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1223", // MySQL 비밀번호 입력
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
    if (err) {
      console.error("데이터베이스 오류:", err);
      return res.status(500).send("로그인 실패: 데이터베이스 오류");
    }

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
  });
});

// 서버 실행
app.listen(3001, () => {
  console.log("서버가 3001 포트에서 실행 중입니다.");
});
