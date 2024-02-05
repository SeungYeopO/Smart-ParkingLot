// 경로 테스트 중


import React, { useState, useEffect } from 'react';

const MapTest = () => {
  const [nowPosition, setNowPosition] = useState([]);
  const updateInterval = 500; // 업데이트 간격 설정

  useEffect(() => {
    const fetchData = async () => { // 데이터를 가져오는 비동기 함수
      try {
        const response = await fetch('http://i10c102.p.ssafy.io:3001/api/parking_sections/1/-1');
        const nowPosition = await response.json();
        setNowPosition(nowPosition); // 상태 업데이트
        console.log('데이터 수신 중:', nowPosition);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    const interval = setInterval(fetchData, updateInterval); // 일정 간격으로 fetchData를 호출

    return () => clearInterval(interval); // 컴포넌트가 언마운트 될 때 인터벌 정리
  }, []); // 빈 의존성 배열로 마운트 시 1회 실행 설정

  const ratio = 1; // 비율 설정

  return (
    <div>
      <div className="map-container">
        {nowPosition.map((position, index) => (
          <div
            key={index}
            className="testposition-dot"
            style={{
              left: `${position.pos_x * ratio}px`,
              top: `${position.pos_y * ratio}px`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default MapTest;
