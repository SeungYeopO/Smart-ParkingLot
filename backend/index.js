const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New client connected');

    // 클라이언트로부터 메시지를 받았을 때의 처리
    socket.on('message', (message) => {
        console.log('Message received:', message);
        // 메시지에 대한 응답 또는 처리
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3001, () => {
    console.log('WebSocket server listening on port 3000');
});
