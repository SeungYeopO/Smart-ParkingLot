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
  
 // 칸 중간 좌표에서 왼쪽 상단 좌표로 바꾸는 로직 => 반환값은 바뀐 x,y좌표가 된다
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
      const ratio = 2
    
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
  // 변환된 x,y 좌표로 주차장 칸을 만드는 부분
  return (
    <div className="parkinglots-dot">
      {modifiedPositions.map((pos,index) => (
        <div
        key = {index}
        className='position-dot'
        style  ={{
          left : `${pos.cPos_x}px`,
          top : `${pos.cPos_y}px`,
          // 경차이면서 angle이 0인 애들은 잘 됨
          // 경차이면서 angledl 90도인 애들은 +height
          //  not 조건에는 경차가아니면서 angle이 0도, angle이 90도 

          //경차면서  angle이 0도면 그대로 , 경차가 아니면서 angle이 0도
          //경차면서 angle이 45도 경차가 아니면서 angle이 45도
          //경차면서 angledl 90도, 경차가 앙니면서 angled이 90도
           
          width : pos.lotType === 2 ? `${pos.s_width * pos.ratio}px` : `${pos.width * pos.ratio}px`,
          height : pos.lotType === 2 ? `${pos.s_height * pos.ratio}px` : `${pos.height * pos.ratio}px`,
          transformOrigin: 'left top',
          transform : pos.angle === '45' ? `rotate(${parseInt(pos.angle)}deg)`: `rotate(${parseInt(pos.angle)}deg)`,
          border: '0.1px solid black',
          marginLeft : pos.angle === '0' ?  0 : pos.height,    

        }}
        >
          <p>{pos.lotType}</p>
        </div>

        
      ))}
      

    </div>
  );
};

export default MyCar;
