import React, { useState } from "react";
import SideNavbar from "../../../components/SideNavbar";
import BottomNavbar from "../../../components/BottomNavbar";

const Help = () => {
  // 로그인한 사용자 정보를 상태로 설정 => 데이터 받아오면 user.으로 전부 초기화
  const [userInfo, setUserInfo] = useState({
    userId: "user123", // 실제 애플리케이션에서는 로그인한 사용자 정보를 여기에 설정
    carNumber: "18가 2967", // 사용자의 차량 번호
    inquiry: "", // 사용자의 문의 내용
  });

  const handleSave = () => {
    console.log("Saved", userInfo);
    // 여기에 서버로 데이터를 보내는 로직을 구현합니다.
  };

  // 문의 내용만 업데이트 하는 함수
  const updateInquiry = (value) => {
    setUserInfo({ ...userInfo, inquiry: value });
  };

  return (
    <div style={{ display: "flex" }}>
      <SideNavbar />
      <div className="line" style={{ display: "flex" }}>
        <p>Help</p>
      </div>
      <div className="myprofile" style={{ marginLeft: "20px" }}>
        <h2 style={{ marginBottom: "50px" }}>Ask for help</h2>
        <div className="form-group">
          <label htmlFor="userId">UserID</label>
          <input
            type="text"
            id="userId"
            value={userInfo.userId}
            disabled // 사용자 ID는 비활성화
          />
        </div>
        <div className="form-group">
          <label htmlFor="carNumber">차량번호</label>
          <input
            type="text"
            id="carNumber"
            value={userInfo.carNumber}
            disabled
            style={{
              color: userInfo.carNumber === "18가 2967" ? "gray" : "black",
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inquiry">문의 내용</label>
          <textarea
            id="inquiry"
            value={userInfo.inquiry}
            onChange={(e) => updateInquiry(e.target.value)}
            placeholder="문의하실 내용을 입력해주세요"
            style={{
              width: "700px", // 너비를 500픽셀로 설정합니다.
              minHeight: "200px",
              /* word-break: keep-all 은 길어서 줄을 바꿀 때 단어를 쪼개서 바꾸지 말라는 기능 */
              wordBreak: "keep-all",
              /* overflow-wrap: break-word 은 길어서 라인을 넘어 갈 경우 넘기지 말고 줄 바꾸라는 뜻 */
              overflowWrap: "break-word",
              color: userInfo.inquiry ? "black" : "gray",
            }}
          />
        </div>
        <button onClick={handleSave} className="save-button">
          Send
        </button>
      </div>
      
    </div>
  );
};

export default Help;
