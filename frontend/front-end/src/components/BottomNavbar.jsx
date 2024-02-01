import React, { useState, useEffect } from "react";

const BottomNavbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date()); // 현재 시간 상태

  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date()); // 1초마다 현재 시간 업데이트
    }, 1000);

    return () => {
      clearInterval(timerId); // 컴포넌트 언마운트 시 인터벌 정리
    };
  }, []);

  // 시간 포맷 지정 (예: '오후 3:45:30')
  const formattedTime = currentTime.toLocaleTimeString("ko-KR");

  return (
    <div className="bottom-navbar">
      <div className="nav-item">
        <img src="./assets/flag.png" alt="flag" />
        롯데마트 수완점
      </div>
      <div className="nav-item">{formattedTime}</div> {/* 현재 시간 표시 */}
      <div className="nav-item">
        {" "}
        <img
          src="./assets/reload.png"
          alt="Reload"
          onClick={refreshPage}
        />{" "}
        {/* 새로고침 이미지 클릭 이벤트 */}
      </div>
    </div>
  );
};

export default BottomNavbar;
