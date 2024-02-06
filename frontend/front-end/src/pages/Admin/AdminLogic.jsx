import React, { useEffect, useState } from "react";
import ParkingLot from "./../../components/ParkingLot";
import MapTest from "./../../components/MapTest";
import SideNavbar from "../../components/SideNavbar";

const AdminLogic = () => {
  const LogicMapStyle = {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  };

  const [floorId, setFloorId] = useState("B2");
  const [typeCheckboxes, setTypeCheckboxes] = useState({
    parkingSpace: true,
    noParkingSpace: false,
    chargingStation: false,
    handicapSpot: false,
  });
  const [congestion, setCongestion] = useState(50);
  const [entrance, setEntrance] = useState(50);
  const [penalty, setPenalty] = useState(50);

  const fetchFloorData = async (selectedFloorId) => {
    const response = await fetch("url"); // 'url'을 실제 요청 URL로 대체해야 합니다.
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    fetchFloorData(floorId);
  }, [floorId]);

  const handleFloorChange = (event) => {
    const selectedValue = event.target.value;
    console.log(`Selected floor: ${selectedValue}`);
    setFloorId(selectedValue);
  };

  const handleCheckboxChange = (event) => {
    setTypeCheckboxes({
      ...typeCheckboxes,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCongestionChange = (event) => {
    setCongestion(event.target.value);
  };

  const handleEntranceChange = (event) => {
    setEntrance(event.target.value);
  };
  const handlePenaltyChange = (event) => {
    setPenalty(event.target.value);
  };



  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <SideNavbar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          className="selection-container"
          style={{ flex: 1, overflow: "auto" }}
        >
          <div style={LogicMapStyle}>
            {/* Floor Selector */}
            <div>
              <select
                className="floor-select-box"
                value={floorId}
                onChange={handleFloorChange}
              >
                <option value="B1">B1</option>
                <option value="B2">B2</option>
              </select>
            </div>
            {/* Checkboxes */}
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="parkingSpace"
                  checked={typeCheckboxes.parkingSpace}
                  onChange={handleCheckboxChange}
                />
                주차공간
              </label>
              <label>
                <input
                  type="checkbox"
                  name="noParkingSpace"
                  checked={typeCheckboxes.noParkingSpace}
                  onChange={handleCheckboxChange}
                />
                노상주차장
              </label>
              <label>
                <input
                  type="checkbox"
                  name="chargingStation"
                  checked={typeCheckboxes.chargingStation}
                  onChange={handleCheckboxChange}
                />
                충전시설
              </label>
              <label>
                <input
                  type="checkbox"
                  name="handicapSpot"
                  checked={typeCheckboxes.handicapSpot}
                  onChange={handleCheckboxChange}
                />
                장애인주차장
              </label>
            </div>
            {/* Sliders */}
            <div className="slider-group">
              <label>
                Congestion
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={congestion}
                  onChange={handleCongestionChange}
                />
                <span>{congestion}</span> {/* 현재 값 표시 */}
              </label>
              <label>
                Entrance
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={entrance}
                  onChange={handleEntranceChange}
                />
                <span>{entrance}</span> {/* 현재 값 표시 */}
              </label>
              <label>
                Penalty
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={penalty}
                  onChange={handlePenaltyChange}
                />
                <span>{penalty}</span> {/* 현재 값 표시 */}
              </label>
            </div>
          </div>
        </div>
        <div
          className="map-container"
          style={{ flex: 2, position: "relative" }}
        >
          <ParkingLot />
          <MapTest />
        </div>
      </div>
    </div>
  );
};

// 내일 CSS 적용
// .form-element {
//   margin-bottom: 10px;
// .checkbox-group label {
//   display: block; 
//   margin-bottom: 10px; 
// }
// .slider-group label {
//   display: flex;
//   align-items: center;
// }
// .slider-group input[type="range"] {
//   margin-right: 10px; 
// }


export default AdminLogic;
