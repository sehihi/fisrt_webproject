const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'news_database'
});

db.connect(() => {
  console.log('Connected to the MySQL database');
});

app.get('/api/weather', (req, res) => {
  const query = 'SELECT dt, temperature, max_temperature, min_temperature, humidity, wind_power, weather_description FROM weather ORDER BY dt DESC LIMIT 5';
  db.query(query, (results) => {
    res.json(results); 
  });
});

// 정적 파일 제공 (HTML 파일 포함)
app.use(express.static('public'));

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});