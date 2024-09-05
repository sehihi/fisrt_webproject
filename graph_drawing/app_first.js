require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const connectDb = require("./config/db");
const port = 3000;

connectDb();
// app.get("/", (req, res) => {
//   res.status(200).send("Hello Express~");
// });
//레이아웃과 뷰 엔진 설정
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", require("./routes/main"));
app.listen(port, () => {
  console.log(`${port}번 포트에서 서버실행 중...`);
});
