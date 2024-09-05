const express = require("express");
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs";
// router.get("/", (req, res) => {
//   res.send("Hello world!");
// });
// main rayout으로 지정해주는 파일 + 변경될 내용들 html로 묶어서 사용
router.get(["/", "/home"], (req, res) => {
  res.render("index", { layout: mainLayout });
});
router.get("/about", (req, res) => {
  res.render("about", { layout: mainLayout });
});

module.exports = router;
