import React, { useState, useEffect } from "react";
import EnterLotModal from "./Modal/EnterLotModal";

const ParkingLot = () => {
  const [nowPosition, setNowPosition] = useState([]); // 좌표값 받아오기
  const [modifiedPositions, setModifiedPositions] = useState([]); // 변환된 좌표값 저장
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://i10c102.p.ssafy.io:3001/api/user/parking_sections/1/-1"
        );
        const nowPosition = await response.json();
        setNowPosition(nowPosition);
        console.log("데이터 수신 중");
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchData(); // fetchData 함수 호출
  }, []);


  useEffect(() => {
    const updateModifiedPositions = async () => {
      const modified = await coordinatePos(nowPosition);
      setModifiedPositions(modified);
      console.log("modified 배열 업데이트 후:", modified);
    };
    updateModifiedPositions(); // fetchData가 완료된 후에 modifiedPositions 업데이트
  }, [nowPosition]);

  // 모달 열기
  useEffect(() => {
    setIsModalOpen(true);

    // const timer = setTimeout(() => {
    //   setIsModalOpen(false);
    // }, 4000);    // 진입 후 4초간만 뜨게 하는 부분

    // return () => clearTimeout(timer);
  }, []);

  // 칸 중간 좌표에서 왼쪽 상단 좌표로 바꾸는 로직 => 반환값은 바뀐 x,y좌표가 된다
  const coordinatePos = (positionData) => {
    const modifiedData = positionData.map((data) => {
      const pos_x = parseInt(data.pos_x);
      const pos_y = parseInt(data.pos_y);
      const lotType = data.type_id;
      const angle = data.angle;
      const width = 47.0;
      const height = 21.5;
      const s_width = 33.1;
      const s_height = 18.9;
      const ratio = 1.3;
      const lotnum = data.data_id;
      var rect_width = 0;
      var rect_height = 0;
      var margin = 0;
      let cPos_x = 0;
      let cPos_y = 0;
      var rot = 0;

      // 좌표값 변환 로직 : 센터에서 왼쪽 상단으로

      if (lotType === 2) {
        if (angle === "0") {
          // 각도가 0도일때
          cPos_x = ratio * pos_x - (s_width * ratio) / 2;
          console.log(`id : ${data.section_id}`);
          console.log(cPos_x);
          //console.log(lotType)
          cPos_y = ratio * pos_y - (s_height * ratio) / 2;
          rect_width = s_width * ratio;
          rect_height = s_height * ratio;
        } else if (angle === "90") {
          // 각도 90도
          cPos_x = ratio * pos_x - (s_height * ratio) / 2;
          cPos_y = ratio * pos_y - (s_width * ratio) / 2;
          console.log("angle다름");
          console.log(`id : ${data.section_id}`);
          console.log(cPos_x);
          // margin = s_height * ratio
          rect_width = s_height * ratio;
          rect_height = s_width * ratio;
        } else {
          // 각도 45도
          cPos_x = ratio * pos_x - (s_height * ratio) / 2;
          cPos_y = ratio * pos_y - (s_width * ratio) / 2;
          // margin = s_height * ratio
          rect_width = s_height * ratio;
          rect_height = s_width * ratio;
          rot = 1;
        }
      } else {
        //일반차량
        if (angle === "0") {
          //각도 0도
          cPos_x = ratio * pos_x - (width * ratio) / 2;
          cPos_y = ratio * pos_y - (height * ratio) / 2;
          rect_width = width * ratio;
          rect_height = height * ratio;
        } else {
          //각도 45도 90도 (일반차는 45도 없음)
          cPos_x = ratio * pos_x - (height * ratio) / 2;
          cPos_y = ratio * pos_y - (width * ratio) / 2;
          rect_width = height * ratio;
          rect_height = width * ratio;
          // margin = height * ratio
        }
      }

      return {
        rot,
        rect_width,
        rect_height,
        lotnum,
        cPos_x,
        cPos_y,
        lotType,
        ratio,
        height,
        width,
        s_height,
        s_width,
        angle,
        margin,
      };
    });
    console.log("변환");
    console.log(modifiedData);

    return modifiedData;
  };

  // 변환된 x,y 좌표로 주차장 칸을 만드는 부분
  return (
    <div className="mapEdge">
      <div className="parkinglots-dot">
        {modifiedPositions.map((pos, index) => (
          <div
            key={index}
            className="position-dot"
            style={{
              left: `${pos.cPos_x}px`,
              top: `${pos.cPos_y}px`,
              width: `${pos.rect_width}px`,
              height: `${pos.rect_height}px`,
              transform: pos.rot === 1 ? `rotate(45deg)` : `rotate(0deg)`,
              border: "0.1px solid black",
              // 데이터 받아오면 값에 따라 배경색 설정
              // backgroundColor:
              //   parkingStatus[space.id] === 1 ? "rgb(2, 24, 45)" : "#66e166",
              border: "2px solid rgba(55, 158, 159, 0.7)",
              borderRadius: "5px",
              boxShadow: "3px 3px 40px 2px rgba(95, 102, 238, 0.5)",
              color: "#66e166", // 글자색 설정
            }}
          >
            <p>{pos.lotnum}</p>
          </div>
        ))}
        {/* 원활할때와 혼잡할떄 다른 모달 띄우는 부분 */}
        <EnterLotModal isOpen={isModalOpen}>
          {/* 조건식 원활할때   */}
          {/* {parkingStatus === '원활' ? ( 원활 모달) : ( 혼잡 모달) } */}
          <>
          {/* <img style={{width : '90px', height : '80px', marginBottom: '10px', marginRight: '15px'}} src="/assets/checkgreen.png" alt="원활" />
          <div style={{display : 'inline-block'}}>
          <p style={{fontSize : 'x-large', fontWeight : 'bold', marginTop : '10px'}}>주차장에 진입하셨습니다</p>
          <p style={{fontSize : '19px', marginLeft : '10px'}}>현재 주차장이 원활합니다.</p>
          </div> */}
          </>
          {/* ) : ( */}
          <>
          <img style={{width : '90px', height : '80px', marginBottom: '10px', marginRight: '15px'}} src="/assets/congestion.png" alt="혼잡" />
          <div style={{display : 'inline-block'}}>
          <p style={{fontSize : 'x-large', fontWeight : 'bold', marginTop : '10px'}}>주차장에 진입하셨습니다</p>
          <p style={{fontSize : '19px', marginLeft : '10px'}}>주차장이 혼잡하여 추천 경로로 안내됩니다</p>
          </div>
          </>

        
          
        </EnterLotModal>
      </div>
    </div>
  );
};

export default ParkingLot;
