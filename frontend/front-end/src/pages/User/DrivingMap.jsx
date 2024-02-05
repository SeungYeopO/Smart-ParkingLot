import React, { useState, useEffect } from 'react';
import SideNavbar from '../../components/SideNavbar';
import BottomNavbar from '../../components/BottomNavbar';

const DrivingMap = () => {
  // 현재 위치와 목적지 위치를 상태로 관리
  const [currentPosition, setCurrentPosition] = useState({ x: 100, y: 50 }); // 46번 주차 공간 위치 가정
  const [destination, setDestination] = useState({ x: 300, y: 250 }); // 61번 주차 공간 위치 가정

  const destinationMapStyle = {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  };

  useEffect(() => {
    // 현재 위치에서 목적지까지 경로를 그리기 위한 로직
    // 이 예제에서는 단순화를 위해 현재 위치와 목적지를 직접 설정합니다.
    // 실제 애플리케이션에서는 경로 계산 알고리즘을 사용할 수 있습니다.
  }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트 마운트 시 1회만 실행

  return (
    <div className="parkingLot" style={{ height: '100vh', display: 'flex' }}>
      <SideNavbar />
      <div style={destinationMapStyle}>
        <div
          style={{
            position: 'absolute',
            left: currentPosition.x,
            top: currentPosition.y,
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'blue', // 현재 위치 마커
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: destination.x,
            top: destination.y,
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'red', // 목적지 마커
          }}
        />
        <svg style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
          <line
            x1={currentPosition.x + 10} // 마커의 중심을 기준으로 선을 그림
            y1={currentPosition.y + 10}
            x2={destination.x + 10}
            y2={destination.y + 10}
            stroke="black"
            strokeWidth="2"
          />
        </svg>
        <BottomNavbar />
      </div>
    </div>
  );
};

export default DrivingMap;
