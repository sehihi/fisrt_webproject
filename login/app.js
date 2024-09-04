const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcrypt"); // bcrypt 추가

const app = express();

app.set("view engine", "ejs"); // EJS 템플릿 엔진 설정
app.set("views", path.join(__dirname, "views")); // 뷰 파일의 경로 설정

app.use(express.static(path.join(__dirname, "public"))); // 정적 파일 제공
app.use(bodyParser.urlencoded({ extended: true })); // 폼 데이터를 처리하기 위한 설정

// 사용자 데이터 (데모용)
const users = []; // 사용자 데이터 배열 초기화

// 로그인 페이지
app.get("/", (req, res) => {
  res.render("login");
});

// 로그인 처리
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    res.render("home", { username });
  } else {
    res.render("login", { error: "Invalid username or password" });
  }
});

app.get("/register", (req, res) => {
  res.render("register", { error: null }); // error 기본값을 null로 설정
});

// 회원가입 처리
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  // 사용자 이름 중복 확인
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.render("register", { error: "Username already exists" });
  }

  // 비밀번호 해시화
  const hashedPassword = bcrypt.hashSync(password, 10);

  // 새 사용자 추가
  users.push({ username, password: hashedPassword });

  // 회원가입 후 로그인 페이지로 리다이렉트
  res.redirect("/");
});

// 서버 시작
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
