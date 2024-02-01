import React, { useState, useEffect } from 'react';

const MyCar = () => {
  const [nowPosition, setNowPosition] = useState([]); // 좌표값 받아오기
  const [modifiedPositions, setModifiedPositions] = useState([]); // 변환된 좌표값 저장

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://i10c102.p.ssafy.io:3001/api/parking_sections/1');
        const nowPosition = await response.json();
        setNowPosition(nowPosition);
        console.log('데이터 수신 중');
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData(); // fetchData 함수 호출
  }, []);

  useEffect(() => {
    
    const modified = coordinatePos(nowPosition);
    setModifiedPositions(modified);
  }, [nowPosition]);

  const coordinatePos = (positionData) => {
    
    const modifiedData = positionData.map((data) => {
      const pos_x = parseInt(data.pos_x);
      const pos_y = parseInt(data.pos_y);
      const lotType = data.section_type_id;
      const angle = data.angle;
      const width = 47.0
      const height = 21.5
      const s_width = 33.1
      const s_height = 18.9
      const ratio = 1
    
      let cPos_x = 0;
      let cPos_y = 0;

      if (lotType === 2) {  // 경차일떄 
        if (angle === '0') {
          cPos_x = (ratio * pos_x) - (s_width * ratio / 2);
          console.log(cPos_x)
          cPos_y = (ratio * pos_y) - (s_height * ratio /2);
        } else {
          cPos_x =(ratio * pos_x) - (s_height * ratio / 2);
          cPos_y = (ratio * pos_y) - (s_width * ratio / 2);
        }
      } else {
        if (angle === '0') {
          cPos_x = (ratio * pos_x) - (width * ratio / 2);
          cPos_y = (ratio * pos_y) - (height * ratio / 2);
        } else {
          cPos_x = (ratio * pos_x) - (height * ratio / 2);
          cPos_y = (ratio * pos_y) - (width / 2);
        }
      }

      return { cPos_x, cPos_y };
    });

    return modifiedData;
  };

  return (
    <div>
      {/* 변환된 좌표를 화면에 출력 */}
      <h1>좌표 목록</h1>
      <ul>
        {modifiedPositions.map((position, index) => (
          <li key={index}>
            x: {position.cPos_x}, y: {position.cPos_y}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCar;


return nowPosition.map((position, index) => (
  <div
    key={index}
    className="position-dot"
    style={{
      left: `${position.pos_x}px`,
      top: `${position.pos_y}px`,
    }}
  >