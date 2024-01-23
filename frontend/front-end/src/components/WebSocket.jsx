// 프론트엔드 코드 (예: App.js)

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // 백엔드 서버 주소로 변경

function WebSocket() {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  // 소켓 연결이 성공하면 실행
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // 서버로부터 메시지를 받으면 실행
    socket.on('message', (message) => {
      setReceivedMessage(message);
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      socket.disconnect();
    };
  }, []);

  // 메시지를 서버로 전송
  const sendMessage = () => {
    socket.emit('message', message);
  };

  return (
    <div>
      <h1>WebSocket Example</h1>
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <p>Received message: {receivedMessage}</p>
    </div>
  );
}

export default WebSocket;
