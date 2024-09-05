const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// 'public' 폴더 내의 정적 파일을 제공
app.use(express.static(path.join(__dirname, 'public')));

// 루트 경로에서 index.html 파일 서빙
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
