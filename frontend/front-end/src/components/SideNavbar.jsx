import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 CSS

const SideNavbar = () => {
  // 다크모드 상태 관리
  const [darkMode, setDarkMode] = useState(false);

  // 다크모드 상태 전환 함수
  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // 상태 전환
    document.body.classList.toggle("dark-mode"); // body의 class를 통해 스타일 적용
  };

  // 토글 버튼 스타일
  const getButtonStyle = () => ({
    cursor: "pointer",
    width: "70px",
    height: "35px",
    borderRadius: "50px",
    position: "relative",
    backgroundColor: `${darkMode ? '#181818' : '#e2e2e2'}`,
    transition: "background-color 0.3s",
  });

  // 토글 버튼 내부 서클 스타일
  const getCircleStyle = () => ({
    position: 'absolute',
    top: '3.3px',
    left: darkMode ? '37px' : '2.5px', // 위치 조정
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    transition: 'left 0.3s',
    // backgroundImage: `url(${darkMode ? '/assets/night.png' : '/assets/light.png'})`,
    backgroundSize: 'cover', // 이미지가 서클을 꽉 채우도록
    backgroundColor: `${darkMode ? '#e2e2e2' : '#181818'}`
  });
  

  return (
    <nav
      className="navbar navbar-light"
      style={{
        backgroundColor: "#191a2b",
        width: "130px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div className="nav-hover">
        <a className="navbar-brand" href="/parkingmap">
          <p>
            Auto
            <br />
            Parking
          </p>
        </a>
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="/drivingmap">
            <img
              src="./assets/Home.png"
              alt="home"
              style={{ marginRight: "1px" }}
            />
          </a>

          <a className="nav-item nav-link" href="/help">
            <img src="./assets/Notifications.png" alt="notifications" />
          </a>

          <a className="nav-item nav-link" href="/profile">
            <img src="./assets/Person.png" alt="person" />
          </a>
        </div>
      </div>

      {/* 하단 설정 버튼 대신 다크모드 토글 버튼 */}
      <div className="navbar-nav" style={{ padding: "10px" }}>
        <div style={getButtonStyle()} onClick={toggleDarkMode}>
          <div style={getCircleStyle()}></div>
        </div>
      </div>
    </nav>
  );
};

export default SideNavbar;
