import React, { useState, useEffect } from 'react';

const MapTest = () => {
  const [nowPosition, setNowPosition] = useState([]); // 좌표값 받아오기

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://i10c102.p.ssafy.io:3001/api/parking_sections/1');
        const nowPosition = await response.json();
        setNowPosition(nowPosition);
        console.log('데이터 수신 중');
        console.log(nowPosition)
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData(); // fetchData 함수 호출
  }, []);

  return (
    <div>
      {/* <h1>좌표 목록</h1> */}
      <div className="map-container">
        {nowPosition.map((position, index) => (
          <div
            key={index}
            className="testposition-dot"
            style={{
              left: `${position.pos_x*2}px`,
              top: `${position.pos_y*2}px`,
              marginRight : position.angle==='0' ? 0 : 21.5*2
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default MapTest;
