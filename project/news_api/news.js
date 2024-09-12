const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// MySQL2 연결 설정 (비밀번호 포함)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',  // root 사용자의 비밀번호 입력
  database: 'news_database'
});

// MySQL2 연결
db.connect();

// 상위 5개의 데이터를 가져오는 API 엔드포인트
app.get('/api/news', (req, res) => {
  const query = 'SELECT title, description, link, pubDate FROM news  LIMIT 5';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching data from the database');
    }
    res.json(results); // 데이터를 JSON 형식으로 반환
  });
});

// 정적 파일 제공 (HTML 파일 포함)
app.use(express.static('public'));

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
