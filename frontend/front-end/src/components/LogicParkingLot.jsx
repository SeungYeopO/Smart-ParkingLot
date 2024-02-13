import React, { useState, useEffect } from "react";
import MapTest from "./MapTest";
import PossiblePlaceModal from "./Modal/PossiblePlaceModal"; // 모달 컴포넌트 경로 확인 필요

const LogicParkingLot = () => {
  const [nowPosition, setNowPosition] = useState([]);
  const [modifiedPositions, setModifiedPositions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parkingStatus, setParkingStatus] = useState({});
  const [selectedLot, setSelectedLot] = useState(null);
  const [modalMessage, setModalMessage] = useState("");

  // 주차장 맵 그리는 로직
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://i10c102.p.ssafy.io:3001/api/user/parking_sections/1/-1"
        );
        const data = await response.json();
        setNowPosition(data);
        console.log("데이터 수신 중:", data);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  // 현재 주차장 상태 알 수 있는 로직
  const fetchParkingStatus = async () => {
    try {
      const response = await fetch(
        "http://i10c102.p.ssafy.io:3001/api/p_manager/section_stats/1/-1"
      );
      const data = await response.json();
      console.log("전체 주차장 상태 데이터:", data);

      // data_id와 클릭된 lotnum을 기반으로 상태 업데이트
      // 누적값, 현재값이 변수
      setParkingStatus(
        data.reduce(
          (acc, curr) => ({
            ...acc,
            [curr.data_id]: curr.is_managed,
          }),
          {}
        )
      );
    } catch (error) {
      console.error("주차 상태를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchParkingStatus(); // 컴포넌트 마운트 시 주차장 상태 데이터를 가져옴 => 훅
  }, []);

  // 클릭했을때 이벤트 내용
  const clickLot = async (lotnum) => {
    console.log(`Lot ${lotnum} clicked.`);
    const currentStatus = parkingStatus[lotnum];
    const message =
      currentStatus === 1
        ? "주차 가능 구역으로 설정할까요?"
        : "주차 불가 구역으로 설정할까요?";
    setModalMessage(message);
    setSelectedLot(lotnum); // 해당 주차칸 id가 선택된 상태 알 수 있게 함
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    // 현재 선택된 주차칸의 is_managed 상태에 따라 새로운 상태를 결정
    const currentStatus = parkingStatus[selectedLot];
    const newStatus = currentStatus === 1 ? 0 : 1; // 현재 상태가 1이면 0으로, 그렇지 않으면 1로 변경

    try {
      console.log(`현재 ${selectedLot}의 상태:`, currentStatus); // 상태 변경 전 콘솔 로그

      const response = await fetch(
        "http://i10c102.p.ssafy.io:3001/api/p_manager/section_states",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data_id: selectedLot,
            is_managed: newStatus, // 새로운 상태로 설정
          }),
        }
      );

      if (!response.ok) throw new Error("Response not OK");

      const result = await response.json();
      console.log(`Server response for lot ${selectedLot}:`, result);

      // 상태 업데이트
      setParkingStatus((prevStatus) => ({
        ...prevStatus,
        [selectedLot]: newStatus,
      }));

      console.log(`변경된 ${selectedLot}의 상태:`, newStatus); // 상태 변경 후 콘솔 로그

      setIsModalOpen(false);
    } catch (error) {
      console.error("주차 자리 상태 변경 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    const updateModifiedPositions = async () => {
      const modified = await coordinatePos(nowPosition);
      setModifiedPositions(modified);
      console.log("modified 배열 업데이트 후:", modified);
    };
    updateModifiedPositions(); // fetchData가 완료된 후에 modifiedPositions 업데이트
  }, [nowPosition]);

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
      const ratio = 1.05;
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
          // console.log(`id : ${data.section_id}`);
          // console.log(cPos_x);
          //console.log(lotType)
          cPos_y = ratio * pos_y - (s_height * ratio) / 2;
          rect_width = s_width * ratio;
          rect_height = s_height * ratio;
        } else if (angle === "90") {
          // 각도 90도
          cPos_x = ratio * pos_x - (s_height * ratio) / 2;
          cPos_y = ratio * pos_y - (s_width * ratio) / 2;
          // console.log("angle다름");
          // console.log(`id : ${data.section_id}`);
          // console.log(cPos_x);
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
    <div className="adminmapEdge">
      <div className="parkinglots-dot">
        {/* <MapTest /> */}
        {modifiedPositions.map((pos, index) => (
          <div
            onClick={() => clickLot(pos.lotnum)}
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

              fontSize: "12px",

              // backgroundColor : parkingStatus[pos.lotnum] ? "rgb(255,0,0)" : "rgb(0,255,255"
            }}
          >
            <p>{pos.lotnum}</p>
          </div>
        ))}
      </div>
      <PossiblePlaceModal isOpen={isModalOpen} onConfirm={handleConfirm}>
        <img src="/assets/notification.png" alt="알림 이모지" />
        <p
          style={{
            display: "inline-block",
            marginLeft: "15px",
            fontSize: "large",
          }}
        >
          {modalMessage}
        </p>
        <div style={{ textAlign: "center" }}>
          <button style={{ marginRight: "30px" }} onClick={handleConfirm}>
            Yes
          </button>
          <button onClick={() => setIsModalOpen(false)}>No</button>
        </div>
      </PossiblePlaceModal>
    </div>
  );
};

export default LogicParkingLot;
