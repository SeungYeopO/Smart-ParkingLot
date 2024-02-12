// RealTimeCarRoute.js
import React from 'react';

const RealTimeCarRoute = ({ currentPosition }) => {
  if (!currentPosition) return null;

  const { pos_x, pos_y } = currentPosition;
  const ratio = 1.3; // MapTest 컴포넌트에서 사용한 비율과 동일하게 설정

  return (
    <div
      className="real-time-car"
      style={{
        position: 'absolute',
        left: `${pos_x * ratio}px`,
        top: `${pos_y * ratio}px`,
        width: '40px',
        height: '40px',
        borderRadius: '60%',
        backgroundColor: 'blue',
        transition: 'left 1s, top 1s' // 위치 변경 시 부드러운 이동을 위한 transition 설정
      }}
    ></div>
  );
};

export default RealTimeCarRoute;