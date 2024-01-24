// npm init  => 백엔드에 node.js 권한설정??
// touch index.js => index.js 파일 생성 
// ==== 백엔드 기본 서버는 돌릴 수 있는 상태 ===

// npm install socket.io
// npm install express


const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//CORS 설정
app.use(cors());

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (message) => {
        console.log('Message received:', message);
       
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

// 백엔드 서버의 변경사항이 있을때마다 emit 이벤트로 프론트에 메시지 보낼 수 있는 부분을 추가했음
    socket.emit('backendMessage', '백엔드에서 온 메시지');

});


// 백엔드 포트 번호 입력
server.listen(5000, () => {
    console.log('WebSocket server listening on port 5000');
});
