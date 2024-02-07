import React, { useEffect, useState } from "react";
import MapTest from "./../../components/MapTest";
import AdminSideNavbar from "../../components/AdminSideNavbar";
import AdminParkingLot from "./../../components/AdminParkingLot";
import AdminUpNavbar from "../../components/AdminUpNavbar";

const AdminLogic = () => {
  const LogicMapStyle = {
    display: "flex",
    flex: 1,
    position: "relative",
    overflow: "hidden",
  };

  const [floorId, setFloorId] = useState("B2");
  const [selectedType, setSelectedType] = useState("myParkingSpace");
  const [congestion, setCongestion] = useState(0);
  const [entrance, setEntrance] = useState(0);
  const [penalty, setPenalty] = useState(0);

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
    setSelectedType(event.target.name);
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
    <div style={{ display: "flex", flex: 1 }}>
      <AdminUpNavbar />
      <div style={{ display: "flex" }}>
        <div>
          <AdminSideNavbar />
        </div>

        <div
          className="logic-page"
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <div className="func-name-logic">
            <p>Logic</p>
          </div>
          <div
            className="selection-container"
            style={{ flex: 1, overflow: "auto" }}
          >
            <div style={LogicMapStyle}>
              <AdminParkingLot />
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
                    name="mart"
                    checked={selectedType === "mart"}
                    onChange={handleCheckboxChange}
                  />
                  A
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="apt"
                    checked={selectedType === "apt"}
                    onChange={handleCheckboxChange}
                  />
                  B
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="office"
                    checked={selectedType === "office"}
                    onChange={handleCheckboxChange}
                  />
                  C
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="myParkingSpace"
                    checked={selectedType === "myParkingSpace"}
                    onChange={handleCheckboxChange}
                  />
                  myPreset
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

            <div
              className="map-container"
              style={{ flex: 2, position: "relative" }}
            >
              <MapTest />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogic;
