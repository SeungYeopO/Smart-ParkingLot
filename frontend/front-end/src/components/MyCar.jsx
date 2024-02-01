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
    const updateModifiedPositions = async () => {
      const modified = await coordinatePos(nowPosition);
      setModifiedPositions(modified);
      console.log('modified 배열 업데이트 후:', modified);
    };
    updateModifiedPositions(); // fetchData가 완료된 후에 modifiedPositions 업데이트
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
          console.log(`id : ${data.section_id}`)
          console.log(cPos_x)
          //console.log(lotType)
          
          cPos_y = (ratio * pos_y) - (s_height * ratio /2);
        } else {
          cPos_x =(ratio * pos_x) - (s_height * ratio / 2);
          cPos_y = (ratio * pos_y) - (s_width * ratio / 2);
          console.log('angle다름')
          console.log(`id : ${data.section_id}`)
          console.log(cPos_x)
          
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

      return { cPos_x, cPos_y, lotType, ratio, height, width, s_height, s_width , angle};
    });
    console.log(modifiedData)

    return modifiedData;
  };

  return (
    <div className="parkinglots-dot">
      {modifiedPositions.map((pos,index) => (
        <div
        key = {index}
        className='position-dot'
        style  ={{
          left : `${pos.cPos_x}px`,
          top : `${pos.cPos_y}px`,
          width : pos.lotType === 2 ? `${pos.s_width * pos.ratio}px` : `${pos.width * pos.ratio}px`,
          height : pos.lotType === 2 ? `${pos.s_height * pos.ratio}px` : `${pos.height * pos.ratio}px`,
          transform : pos.angle === '45' ? `rotate(${pos.angle - 90}deg)`: `rotate(${pos.angle}deg)`,
          border: '0.1px solid black',         

        }}
        >
          <p>{pos.lotType}</p>
        </div>

        
      ))}
      

    </div>
  );
};

export default MyCar;
