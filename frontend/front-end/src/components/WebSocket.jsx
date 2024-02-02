// npm install npm install socket.io-client
// frontend => 클라이언트 소켓
// react server => localhost3000
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// 통신할 백엔드 서버 주소작성, CORS 정책때문에 뒤에 추가 
const socket = io('http://localhost:5000', { transports: ['websocket'], withCredentials: true });

function WebSocket() {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');


  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

 
    socket.on('message', (message) => {
      setReceivedMessage(message);
    });


    // 백엔드 서버의 변경 사항이 생겨서 실시간으로 반영될때 콘솔에
    // 어떤 변경사항이 있었는지 확인할 수 있는 부분을 추가했음 
    socket.on('backendMessage', (message) => {
    
      console.log('Received message from backend:', message);
      
    });
    

 
    return () => {
      socket.disconnect();
    };
  }, []);


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
