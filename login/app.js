const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcrypt"); // 비밀번호 암호화를 위한 bcrypt
const app = express();

app.set("view engine", "ejs"); // EJS 템플릿 엔진 설정
app.set("views", path.join(__dirname, "views")); // 뷰 파일 경로 설정

app.use(express.static(path.join(__dirname, "public"))); // 정적 파일 제공
app.use(bodyParser.urlencoded({ extended: true })); // POST 요청의 데이터를 처리하기 위한 body-parser 설정

// 사용자 데이터 (데모용 - 실제로는 데이터베이스를 사용하는 것이 좋습니다)
const users = [];

// 홈/로그인 페이지
app.get("/", (req, res) => {
  res.render("login");
});

// 로그인 처리
app.post("/login", (req, res) => {
  const { username, password, rememberMe } = req.body; // rememberMe 추가
  const user = users.find((u) => u.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    // rememberMe 체크 여부 확인
    if (rememberMe) {
      console.log("로그인 상태 유지 옵션 선택됨.");
      // 여기서 쿠키나 세션 설정을 해도 됨 (이 예제에서는 생략)
    }

    res.render("home", { username }); // 로그인 성공 시 홈 화면으로 이동
  } else {
    res.render("login", { error: "아이디 또는 비밀번호가 올바르지 않습니다." });
  }
});

// 회원가입 페이지
app.get("/register", (req, res) => {
  res.render("register");
});

// 회원가입 처리
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  // 사용자 이름 중복 확인
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.render("register", { error: "이미 존재하는 아이디입니다." });
  }

  // 비밀번호 암호화
  const hashedPassword = bcrypt.hashSync(password, 10);

  // 새로운 사용자 추가
  users.push({ username, password: hashedPassword });

  console.log("회원가입 성공!"); // 디버그 로그

  // 회원가입 완료 페이지로 리다이렉트
  res.redirect("/register-success");
});

// 회원가입 성공 페이지
app.get("/register-success", (req, res) => {
  res.render("register-success");
});

// 서버 시작
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
