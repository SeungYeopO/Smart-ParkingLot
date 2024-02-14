import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 CSS
import { useLocation } from "react-router-dom";

const AdminSideNavbar = () => {
  // 다크모드 상태 관리
  const savedMode = localStorage.getItem("theme");
  const [darkMode, setDarkMode] = useState(savedMode === "dark");
  const [activeMenu, setActiveMenu] = useState("");
  const location = useLocation();

  // 현재 어떤 카테고리  url에 있는지 얻어와주는 로직
  useEffect(() => {
    console.log(location);
    switch (location.pathname) {
      case "/admincctv":
        setActiveMenu("CCTV");
        break;
      case "/adminstatus":
        setActiveMenu("Status");
        break;
      case "/adminlogic":
        setActiveMenu("Logic");
        break;
    }
  }, [location]);

  const getActiveStyle = (menuName) => ({
    color: activeMenu === menuName ? "#FFD700" : "white",
    fontSize: "20px",
    marginBottom: "15px",
  });

  // 다크모드 상태 전환 함수
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode); // 상태 전환
    // 항상 다크 모드로 설정
    localStorage.setItem("theme", "dark");

    if (newMode) {
      document.body.classList.add("dark-mode"); // 다크 모드 활성화
      document.body.classList.remove("light-mode"); // 라이트 모드 비활성화
    } else {
      document.body.classList.remove("dark-mode"); // 다크 모드 비활성화
      document.body.classList.add("light-mode"); // 라이트 모드 활성화
    }
  };

  // 컴포넌트가 마운트될 때 한 번 실행하여 로컬 스토리지에 저장된 모드를 적용
  useEffect(() => {
    if (savedMode) {
      if (savedMode === "dark") {
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
      } else {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
      }
    }
  }, [savedMode]);

  // 토글 버튼 스타일
  const getButtonStyle = () => ({
    cursor: "pointer",
    width: "70px",
    height: "35px",
    borderRadius: "50px",
    position: "relative",
    backgroundColor: `${darkMode ? "#373636" : "#e2e2e2"}`,
    transition: "background-color 0.3s",
  });

  // 토글 버튼 내부 서클 스타일
  const getCircleStyle = () => ({
    position: "absolute",
    top: "3.3px",
    left: darkMode ? "37px" : "2.5px", // 위치 조정
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    transition: "left 0.3s",
    // backgroundImage: `url(${darkMode ? '/assets/night.png' : '/assets/light.png'})`,
    backgroundSize: "cover", // 이미지가 서클을 꽉 채우도록
    backgroundColor: `${darkMode ? "#e2e2e2" : "#373636"}`,
  });

  return (
    <nav
      className="navbar navbar-light"
      style={{
        backgroundColor: "#191a2b",
        width: "130px",
        height: "110vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div className="nav-hover">
        <a className="navbar-brand" href="/adminmode">
          <p>
            Auto
            <br />
            Parking
          </p>
        </a>
        <div className="navbar-nav">
          <a
            className="nav-item nav-link active"
            style={getActiveStyle("CCTV")}
            href="/admincctv"
          >
            CCTV
          </a>
          <a
            className="nav-item nav-link"
            style={getActiveStyle("Status")}
            href="/adminstatus"
          >
            주차 관리 및 현황
          </a>
          <a
            className="nav-item nav-link"
            style={getActiveStyle("Logic")}
            href="/adminlogic"
          >
            프리셋
          </a>
        </div>
      </div>

      {/* 하단 설정 버튼 대신 다크모드 토글 버튼 */}
      <div className="navbar-nav" style={{ padding: "10px", display: "none" }}>
        <div style={getButtonStyle()} onClick={toggleDarkMode}>
          <div style={getCircleStyle()}></div>
        </div>
      </div>
    </nav>
  );
};

export default AdminSideNavbar;
