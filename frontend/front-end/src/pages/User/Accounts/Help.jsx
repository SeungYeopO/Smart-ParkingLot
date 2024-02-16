import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../../../components/BottomNavbar";
import SideNavbar from "../../../components/SideNavbar";

const Help = () => {
  const [userInfo, setUserInfo] = useState({
    userId: "user123",
    carNumber: "18가 2967",
    inquiry: "", // 문의 내용 추가
  });

  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSave = () => {
    console.log("Saved", userInfo);
    // 여기에서 저장 로직을 처리하고, 처리 완료 후 /parkingmap으로 이동합니다.
    navigate("/parkingmap");
  };

  const updateInquiry = (value) => {
    setUserInfo({ ...userInfo, inquiry: value });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "none" }}>
        <SideNavbar />
      </div>
      <div style={{ margin: "20px" }}>
        <h2 style={{ marginBottom: "50px", textAlign: "center" }}>Ask for help</h2>
        <div className="form-border1">
          <div className="form-group">
            <label htmlFor="userId">UserID</label>
            <input type="text" id="userId" value={userInfo.userId} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="carNumber">차량번호</label>
            <input
              type="text"
              id="carNumber"
              value={userInfo.carNumber}
              disabled
              style={{ color:  "black" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inquiry">문의 내용</label>
            {/* 셀렉트 박스(드롭다운 메뉴) 추가 */}
            <select
              id="inquiry"
              value={userInfo.inquiry}
              onChange={(e) => updateInquiry(e.target.value)}
              style={{ width: "700px", marginBottom: "10px", fontSize: "20px" }}
            >
              <option value="">문의 내용을 선택하세요</option>
              <option value="주차장에 문제가 있어요 관리자 호출 부탁드립니다.">주차장에 문제가 있어요 관리자 호출 부탁드립니다.</option>
              <option value="주차장에 사고가 났어요 조치 바랍니다.">주차장에 사고가 났어요 조치 바랍니다.</option>
              <option value="안내된 자리에 누가 주차를 해놨어요">안내된 자리에 누가 주차를 해놨어요</option>
            </select>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <button onClick={handleSave} className="save-button">
            Send
          </button>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default Help;
