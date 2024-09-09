const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql2');

// MySQL 데이터베이스 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000', // 본인의 MySQL 비밀번호로 변경
    database: 'news_database'
});

// Express 애플리케이션 설정
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 클라이언트에 index.html 제공
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Socket.IO 연결 처리
io.on('connection', (socket) => {
    console.log('새 클라이언트가 연결되었습니다.');

    // 클라이언트가 연결되었을 때 새로운 알림을 확인
    checkForNewNotifications(socket);

    socket.on('disconnect', () => {
        console.log('클라이언트가 연결을 종료했습니다.');
    });
});

// 새로운 알림을 감지하는 함수
function checkForNewNotifications(socket) {
    // notifications 테이블 모니터링
    db.query('SELECT * FROM notifications ORDER BY id DESC LIMIT 1', (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            const latestNotification = result[0];

            // 새 뉴스 데이터를 가져오기 위한 쿼리 실행
            db.query('SELECT * FROM news WHERE id = ?', [latestNotification.news_id], (err, newsResult) => {
                if (err) throw err;

                if (newsResult.length > 0) {
                    const latestNews = newsResult[0];

                    // 새 데이터를 클라이언트에 전송
                    socket.emit('newData', {
                        title: latestNews.title,
                        description: latestNews.description,
                        pubDate: latestNews.pubDate
                    });
                }
            });
        }
    });
}

// 서버 시작
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
