import React, { useEffect, useState } from "react";
import MapTest from "./../../components/MapTest";
import AdminSideNavbar from "../../components/AdminSideNavbar";
import AdminParkingLot from "./../../components/AdminParkingLot";
import AdminUpNavbar from "../../components/AdminUpNavbar";
import LogicParkingLot from "../../components/LogicParkingLot";

const AdminLogic = () => {
  const [floorId, setFloorId] = useState("B1");
  const [selectedType, setSelectedType] = useState("myParkingSpace");
  const [congestion, setCongestion] = useState(0);
  const [width, setWidth] = useState(0);
  const [entrance, setEntrance] = useState(0);
  const [penalty, setPenalty] = useState(0);
  const [presets, setPresets] = useState([]);
  const [presetMessages, setPresetMessages] = useState({
    congestion: "",
    width: "",
    entrance: "",
    penalty: "",
  });
  const [isDisabled, setIsDisabled] = useState({
    congestion: false,
    width: false,
    entrance: false,
    penalty: false,
  });


  useEffect(() => {
    const fetchBasePresets = async () => {
      const apiUrl = `http://i10c102.p.ssafy.io:3001/api/p_manager/lot_base_presets`;

      try {
        const response = await fetch(apiUrl);
        const presetsData = await response.json();
        setPresets(presetsData);
      } catch (error) {
        console.error("Error fetching base presets: ", error);
      }
    };

    fetchBasePresets();
  }, []); // 컴포넌트 마운트 시 실행

  useEffect(() => {
    const fetchMyPresetData = async () => {
      if (selectedType === "myParkingSpace") {
        const apiUrl = `http://i10c102.p.ssafy.io:3001/api/p_manager/lot_personal_presets/1`;

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          const myPresetData = data[0]; // 배열의 첫 번째 요소에 접근

          setCongestion(myPresetData.congestion);
          setWidth(Math.min(myPresetData.is_wide, 2)); // is_wide 값이 슬라이더 범위를 넘지 않도록 조정
          setEntrance(myPresetData.entry_exit);
          setPenalty(myPresetData.penalty_limit);
        } catch (error) {
          console.error("Error fetching myPreset data: ", error);
        }
      }
    };

    fetchMyPresetData();
  }, [selectedType]); // selectedType 변경 시 실행

  const handleSave = async () => {
    // 항상 myPreset 값을 사용합니다.
    const apiUrl = `http://i10c102.p.ssafy.io:3001/api/p_manager/lot_personal_presets`;

    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lot_id: 1,
          building_type: selectedType, // 실제로 선택된 타입을 사용합니다.
          congestion: congestion,
          entry_exit: entrance,
          is_wide: width,
          penalty_limit: penalty,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();
      console.log("Save successful:", responseData);

      // 변경된 값을 로컬 스토리지에 저장합니다.
      localStorage.setItem("selectedType", selectedType);
      localStorage.setItem("congestion", congestion);
      localStorage.setItem("width", width);
      localStorage.setItem("entrance", entrance);
      localStorage.setItem("penalty", penalty);

      // 저장 후 사용자에게 알림
      alert("저장 되었습니다.");
    } catch (error) {
      console.error("Failed to save data:", error);
      alert("Failed to save settings.");
    }
  };

  useEffect(() => {
    // selectedType이 바뀔 때마다 실행
    const isMyParkingSpace = selectedType === "myParkingSpace";
    setIsDisabled({
      congestion: !isMyParkingSpace,
      width: !isMyParkingSpace,
      entrance: !isMyParkingSpace,
      penalty: !isMyParkingSpace,
    });
  }, [selectedType]); // 의존성 배열에 selectedType을 추가하여 selectedType이 변경될 때마다 실행되도록 합니다.

  useEffect(() => {
    // 로컬 스토리지에서 값 불러오기
    const savedSelectedType = localStorage.getItem("selectedType");
    const savedCongestion = localStorage.getItem("congestion");
    const savedWidth = localStorage.getItem("width");
    const savedEntrance = localStorage.getItem("entrance");
    const savedPenalty = localStorage.getItem("penalty");

    if (savedSelectedType) setSelectedType(savedSelectedType);
    if (savedCongestion) setCongestion(parseInt(savedCongestion, 10));
    if (savedWidth) setWidth(parseInt(savedWidth, 10));
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

  const handleWidthChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setWidth(value);
    setPresetMessages((prevMessages) => ({
      ...prevMessages,
      width: value > 0 ? "선택한 너비를 기준으로 주차 공간을 설정합니다." : "", // Width 메시지 업데이트
    }));
  };

  const handleEntranceChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setEntrance(value);
    setPresetMessages((prevMessages) => ({
      ...prevMessages,
      entrance: value === 1 ? "출구쪽으로 경로를 안내합니다." : "",
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

  const getWidthMessage = (value) => {
    if (value === 0) {
      return "주차장의 너비가 좁은 편 입니다.";
    } else if (value === 1) {
      return `주차장의 너비가 중간 입니다.`;
    } else {
      return `주차장의 너비가 넓은 편 입니다.`;
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
      return "패널티를 부여하지 않습니다.";
    } else {
      return `경고 ${value}회 부터 패널티를 부여합니다.`;
    }
  };

  const handleFloorChange = (event) => {
    const selectedValue = event.target.value;
    console.log(`Selected floor: ${selectedValue}`);
    setFloorId(selectedValue);
  };

  // handleCheckboxChange 함수에서 체크박스를 클릭할 때 선택된 프리셋으로 상태를 업데이트
  const handleCheckboxChange = async (event) => {
    const type = event.target.name;
    setSelectedType(type);

    // 선택된 프리셋 찾기
    const selectedPreset = presets.find(
      (preset) => preset.building_type === event.target.name
    );

    setIsDisabled({
      congestion: type !== "myParkingSpace",
      width: type !== "myParkingSpace",
      entrance: type !== "myParkingSpace",
      penalty: type !== "myParkingSpace",
    });

    // 선택된 프리셋이 'mypreset'일 때만 값을 업데이트하고 변경 가능하도록 설정
    if (selectedPreset) {
      setCongestion(selectedPreset.congestion);
      setWidth(selectedPreset.is_wide);
      setEntrance(selectedPreset.entry_exit);
      setPenalty(selectedPreset.is_penalty ? selectedPreset.penalty_limit : 0);

      // 변경 가능하도록 슬라이더 활성화
      setIsDisabled({
        congestion: selectedPreset.building_type !== "myParkingSpace",
        entrance: selectedPreset.building_type !== "myParkingSpace",
        width: selectedPreset.building_type !== "myParkingSpace",
        penalty: selectedPreset.building_type !== "myParkingSpace",
      });
    } else if (event.target.name === "myParkingSpace") {
      // 'mypreset'이 선택된 경우에만 슬라이더 활성화하고 기본값으로 설정
      setIsDisabled({
        congestion: false,
        entrance: false,
        width: false,
        penalty: false,
      });
    } else {
      // 선택된 프리셋이 없을 때는 슬라이더 비활성화
      setIsDisabled({
        congestion: true,
        entrance: true,
        width: true,
        penalty: true,
      });
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
              <LogicParkingLot />
            </div>
            {/* <MapTest /> */}
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
                height: "540px",
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
                      name="마트"
                      checked={selectedType === "마트"}
                      onChange={handleCheckboxChange}
                    />
                    &nbsp;A
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="아파트"
                      checked={selectedType === "아파트"}
                      onChange={handleCheckboxChange}
                    />
                    &nbsp;B
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="사업장"
                      checked={selectedType === "사업장"}
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
                  Congestion&nbsp;&nbsp;|&nbsp;&nbsp;
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
                  &nbsp;&nbsp;&nbsp;&nbsp;Width&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="1"
                    value={width}
                    onChange={handleWidthChange}
                    disabled={isDisabled.width}
                  />
                  <span>{width}</span>
                </label>
                <div className="preset-text">
                  <p>{getWidthMessage(width)}</p>
                </div>
                <label>
                  &nbsp;&nbsp;Entrance &nbsp;|&nbsp;
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="1"
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
                  &nbsp;&nbsp;&nbsp;Penalty &nbsp;|&nbsp;&nbsp;&nbsp;
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
