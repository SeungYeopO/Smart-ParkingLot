import React from "react";
import AdminSideNavbar from "../../components/AdminSideNavbar";
import MapTest from "../../components/MapTest";
import ParkingLot from "../../components/ParkingLot";
import AdminUpNavbar from "../../components/AdminUpNavbar";
import { useEffect, useState } from "react";
import AdminParkingLot from "./../../components/AdminParkingLot";

const AdminStatus = () => {
  const [floorId, setFloorId] = useState("1");

  const destinationMapStyle = {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    marginLeft: "30px",
  };

  const fetchFloorData = async (seletedFloorId) => {
    const response = await fetch("url");
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    fetchFloorData(floorId);
  }, [floorId]);

  const handleFloorChange = (event) => {
    const selectedValue = event.target.value;
    console.log(`Selected floor: ${selectedValue}`); // 콘솔에 선택된 층의 값을 출력
    setFloorId(selectedValue); // 상태를 업데이트
  };

  return (
    <div>
      <AdminUpNavbar />
      <div style={{ display: "flex" }}>
        <div>
          <AdminSideNavbar />
        </div>
        <div>
          <div>
            <div className="func-name">
              <p>Status</p>
            </div>
            <div className="floor-status" style={{ display: "flex" }}>
              <div>
                <select
                  className="floor-select-box"
                  onChange={handleFloorChange}
                >
                  <option value="1">B1</option>
                  <option value="2">B2</option>
                </select>
              </div>
              <div className="status-box">
                <img src="/assets/checkgreen.png" alt="checkimg" />
                {/* 프리셋에서 혼잡/원활 변수 올리면 요청 받아서 조건식으로 사용 */}
                {/* <img src={isCongested ? "/assets/congestion.png" : "/assets/checkgreen.png"} alt={isCongested ? "혼잡" : "원활"} /> */}
                <p
                  style={{
                    display: "inline-block",
                    marginLeft: "20px",
                    marginTop: "40px",
                    fontSize: "large",
                  }}
                >
                  현재 대수 / 전체 대수
                </p>
                {/* {`${변수}} / 전체대수`} 이런식으로 템플릿 리터럴 사용  */}
              </div>
            </div>
            <div className="status-notify">
              <img src="/assets/notification.png" alt="알림img" />
              <p style={{ display: "inline-block" }}>주차장이 원활합니다.</p>
              {/* 여기도 혼잡 시 상황에 따른 문구 추가 */}
            </div>
            <div style={destinationMapStyle}>
              <AdminParkingLot />
              {/* <MapTest /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatus;
