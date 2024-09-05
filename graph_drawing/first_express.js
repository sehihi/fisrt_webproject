const express = require("express");
const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.status(200).send("Hello Express~");
});
app.listen(port, () => {
  console.log(`${port}번 포트에서 서버실행 중...`);
});
