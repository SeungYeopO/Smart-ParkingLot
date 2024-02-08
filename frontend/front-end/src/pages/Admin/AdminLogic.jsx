import React, { useEffect, useState } from "react";
import MapTest from "./../../components/MapTest";
import AdminSideNavbar from "../../components/AdminSideNavbar";
import AdminParkingLot from "./../../components/AdminParkingLot";
import AdminUpNavbar from "../../components/AdminUpNavbar";

const AdminLogic = () => {
  const [floorId, setFloorId] = useState("B1");
  const [selectedType, setSelectedType] = useState("myParkingSpace");
  const [congestion, setCongestion] = useState(0);
  const [entrance, setEntrance] = useState(0);
  const [penalty, setPenalty] = useState(0);
  const [presetMessages, setPresetMessages] = useState({
    congestion: "",
    entrance: "",
    penalty: "",
  });
  const [isDisabled, setIsDisabled] = useState({
    congestion: false,
    entrance: false,
    penalty: false,
  });

  const fetchFloorData = async (selectedFloorId) => {
    const response = await fetch("url"); // 'url'을 실제 요청 URL로 대체해야 합니다.
    const data = await response.json();
    console.log(data);
  };

  // save 누르면 프리셋 조절 값 DB로 보내기
  const handleSave = async () => {
    // 백엔드 엔드포인트 URL, 이는 실제 서버의 엔드포인트로 대체해야 합니다.
    const apiUrl = "your-backend-endpoint-url";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          floorId,
          congestion,
          entrance,
          penalty,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();
      console.log("Save successful:", responseData);
      // 성공 메시지 처리 또는 상태 업데이트
    } catch (error) {
      console.error("Failed to save data:", error);
      // 에러 처리
    }

    // save 누르면 설정한 값 유지하기 
    localStorage.setItem("floorId", floorId);
    localStorage.setItem("congestion", congestion);
    localStorage.setItem("entrance", entrance);
    localStorage.setItem("penalty", penalty);
  };

  useEffect(() => {
    const savedFloorId = localStorage.getItem("floorId");
    const savedCongestion = localStorage.getItem("congestion");
    const savedEntrance = localStorage.getItem("entrance");
    const savedPenalty = localStorage.getItem("penalty");

    if (savedFloorId) setFloorId(savedFloorId);
    if (savedCongestion) setCongestion(parseInt(savedCongestion, 10)); // 값이 문자열이니 parseInt 10진수로 ㅇㅅㅇ
    if (savedEntrance) setEntrance(parseInt(savedEntrance, 10));
    if (savedPenalty) setPenalty(parseInt(savedPenalty, 10));
  }, []);

  const handleCongestionChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setCongestion(value);
    setPresetMessages((prevMessages) => ({
      ...prevMessages,
      congestion:
        value >= 10 ? "남은 자리가 10%가 넘어가면 혼잡 상태가 됩니다." : "",
    }));
  };

  const handleEntranceChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setEntrance(value);
    setPresetMessages((prevMessages) => ({
      ...prevMessages,
      entrance: value === 100 ? "출구쪽으로 경로를 안내합니다." : "",
    }));
  };

  const handlePenaltyChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setPenalty(value);
    setPresetMessages((prevMessages) => ({
      ...prevMessages,
      penalty: value > 0 ? "잘 지켜라" : "",
    }));
  };

  const getCongestionMessage = (value) => {
    if (value === 0) {
      return "항상 원활 상태로 설정합니다.";
    } else if (value === 100) {
      return "항상 혼잡 상태로 설정합니다.";
    } else {
      return `${value}% 부터 혼잡 상태로 설정합니다.`;
    }
  };

  const getEntranceMessage = (value) => {
    if (value === 0) {
      return "시설물 입구 쪽으로 경로를 안내합니다";
    } else {
      return "주차장 입구 쪽으로 경로를 안내합니다";
    }
  };

  const getPenaltyMessage = (value) => {
    if (value === 0) {
      return "주의사항을 어길시 즉시 패널티를 부여합니다.";
    } else {
      return `${value}회 경고 후 패널티를 부여합니다.`;
    }
  };

  useEffect(() => {
    fetchFloorData(floorId);
  }, [floorId]);

  const handleFloorChange = (event) => {
    const selectedValue = event.target.value;
    console.log(`Selected floor: ${selectedValue}`);
    setFloorId(selectedValue);
  };

  const handleCheckboxChange = async (event) => {
    setSelectedType(event.target.name);

    // 백엔드에서 데이터 가져오기 (가상의 API 호출 예시)
    const fetchData = async () => {
      const response = await fetch(`your-api-url/${event.target.name}`);
      const data = await response.json();
      return data;
    };

    try {
      const data = await fetchData();

      // 가져온 데이터로 상태 업데이트
      setCongestion(data.congestion);
      setEntrance(data.entrance);
      setPenalty(data.penalty);

      // 슬라이더 비활성화
      setIsDisabled({
        congestion: true,
        entrance: true,
        penalty: true,
      });
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
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
            style={{ display: "flex", flexDirection: "row", margin: "20px" }}
          >
            <div style={{ position: "relative" }}>
              <AdminParkingLot />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "60px",
                marginTop: "10px",
                fontSize: "20px",
                border: "1px solid #ececec",
                boxShadow: "3px 3px 80px 2px rgba(142, 146, 211, 0.5)",
                borderRadius: "20px",
                width: "350px",
                height: "440px",
              }}
            >
              {/* Floor Selector */}
              <div className="floor-and-checkbox-container">
                <div>
                  <select
                    className="floor-select-box"
                    style={{ borderRadius: "4px", marginTop: "30px" }}
                    value={floorId}
                    onChange={handleFloorChange}
                  >
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                  </select>
                  <button
                    className="save-preset"
                    style={{ marginLeft: "50px" }}
                    onClick={handleSave}
                    // disabled={selectedType !== "myParkingSpace"} // myPreset이 선택되지 않았을 때는 비활성화
                  >
                    Save
                  </button>
                </div>
                {/* Checkboxes */}
                <div
                  className="checkbox-group"
                  style={{ marginLeft: "30px", marginTop: "20px" }}
                >
                  <label>
                    <input
                      type="checkbox"
                      name="mart"
                      checked={selectedType === "mart"}
                      onChange={handleCheckboxChange}
                    />
                    &nbsp;A
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="apt"
                      checked={selectedType === "apt"}
                      onChange={handleCheckboxChange}
                    />
                    &nbsp;B
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="office"
                      checked={selectedType === "office"}
                      onChange={handleCheckboxChange}
                    />
                    &nbsp;C
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="myParkingSpace"
                      checked={selectedType === "myParkingSpace"}
                      onChange={handleCheckboxChange}
                    />
                    &nbsp;myPreset
                  </label>
                </div>
              </div>
              {/* Sliders */}
              <div className="slider-group" style={{ marginLeft: "20px" }}>
                <label>
                  Congestion&nbsp;
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="10"
                    value={congestion}
                    onChange={handleCongestionChange}
                    disabled={isDisabled.congestion}
                  />
                  <span>{congestion}</span> {/* 현재 값 표시 */}
                </label>
                <div className="preset-text">
                  <p>{getCongestionMessage(congestion)}</p>
                </div>
                <label>
                  Entrance&nbsp;
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="100"
                    value={entrance}
                    onChange={handleEntranceChange}
                    disabled={isDisabled.entrance}
                  />
                  <span>{entrance}</span> {/* 현재 값 표시 */}
                </label>
                <div className="preset-text">
                  <p>{getEntranceMessage(entrance)}</p>
                </div>
                <label>
                  Penalty&nbsp;
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="1"
                    value={penalty}
                    onChange={handlePenaltyChange}
                    disabled={isDisabled.penalty}
                  />
                  <span>{penalty}</span> {/* 현재 값 표시 */}
                </label>
                <div className="preset-text">
                  <p>{getPenaltyMessage(penalty)}</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="map-container"
            style={{ flex: 1, position: "relative" }}
          >
            {/* <MapTest /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogic;
