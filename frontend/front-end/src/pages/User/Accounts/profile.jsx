import React, { useState } from "react";
import SideNavbar from "../../../components/SideNavbar";

const Profile = () => {
  // 로그인한 사용자 정보를 상태로 설정 => 데이터 받아오면 user.으로 전부 초기화
  const [user, setUser] = useState({
    userId: "user123",
    carNumber: "18가 2967",
    carType: "전기차",
    disabled: "",
  });
  const [specialMessage, setSpecialMessage] = useState("");

  const handleSave = () => {
    console.log("Saved", user);
    // 서버로 데이터를 보내는 로직을 여기에 구현하면 됩니다.
  };

  // 차량번호와 차량 종류만 업데이트 하는 함수
  const updateCarInfo = (key, value) => {
    setUser({ ...user, [key]: value });

    if (key === "disabled" && value === "장애인") {
      setSpecialMessage("비장애인이실 경우 불이익을 받으실 수 있습니다.");
    } else {
      setSpecialMessage("");
    }
  };

  return (
    <div className="profile-fill" style={{ display: "flex" }}>
      <SideNavbar />
      <div className="line" style={{ display: "flex" }}>
        <div className="profile-content">
          <p>Edit Profile</p>
        </div>
      </div>
      <div className="myprofile" style={{ marginLeft: "20px" }}>
        <h2 style={{ marginBottom: "50px" }}>My Profile</h2>
        <div className="form-group">
          <label htmlFor="userId">UserID</label>
          <input
            type="text"
            id="userId"
            value={user.userId}
            disabled // 사용자 ID는 비활성화
          />
        </div>
        <div className="form-group">
          <label htmlFor="carNumber">차량번호</label>
          <input
            type="text"
            id="carNumber"
            value={user.carNumber}
            onChange={(e) => updateCarInfo("carNumber", e.target.value)}
            style={{ color: user.carNumber === "18가 2967" ? "gray" : "black" }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="carType">차량 종류</label>
          <select
            id="carType"
            value={user.carType}
            onChange={(e) => updateCarInfo("carType", e.target.value)}
            style={{ color: user.carType === "전기차" ? "gray" : "black" }}
          >
            <option value="일반">일반차량</option>
            <option value="전기차">전기차</option>
            <option value="경차">경차</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="disabled">장애인 여부</label>
          <select
            id="disabled"
            value={user.disabled}
            onChange={(e) => updateCarInfo("disabled", e.target.value)}
            style={{ color: user.disabled === "" ? "gray" : "black" }}
          >
            <option value="비장애인">비장애인</option>
            <option value="장애인">장애인</option>
          </select>
          {specialMessage && (
            <p style={{ color: "red", fontSize: "17px", padding: "10px" }}>
              {specialMessage}
            </p>
          )}
        </div>
        <button onClick={handleSave} className="save-button">
          Save
        </button>
      </div>
    </div>
  );
};

export default Profile;
