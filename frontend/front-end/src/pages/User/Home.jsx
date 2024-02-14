import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // 다크모드 상태 관리
  const savedMode = localStorage.getItem("theme");
  const [darkMode, setDarkMode] = useState(savedMode === "dark");
  const [isHovered, setIsHovered] = useState(false);

  // 다크모드 상태 전환 함수
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode); // 상태 전환
    // 로컬 스토리지에 모드 선택 저장
    localStorage.setItem("theme", newMode ? "dark" : "light");

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

  const hoverStyle = {
    backgroundColor: "#4a4a4a",
    opacity: 0.8
  };

  // 토글 버튼 스타일
  const getButtonStyle = () => ({
    cursor: "pointer",
    width: "95px", // 버튼의 너비
    height: "95px", // 버튼의 높이
    marginTop: "330px",
    marginRight: "1px",
    position: "relative",
    backgroundColor: `${darkMode ? "#575659" : "#e2e2e2"}`,
    transition: "background-color 0.3s, transform 0.3s, box-shadow 0.3s", // 트랜지션 추가
    backgroundImage: `url(${
      darkMode ? "../assets/moon.png" : "../assets/sun.png"
    })`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "40px 40px",
    ...(isHovered ? hoverStyle : {}), // 마우스 호버 상태일 때만 hoverStyle을 적용
  });

  // 마우스 호버 이벤트 핸들러
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // 이미지가 버튼의 중심에 오도록 backgroundImage와 관련된 스타일 속성을 추가했습니다.

  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date()); // 현재 시간 상태

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date()); // 1초마다 현재 시간 업데이트
    }, 1000);

    return () => {
      clearInterval(timer); // 컴포넌트 언마운트 시 타이머 제거
    };
  }, []);

  const goToDestinationPage = () => {
    navigate("/destinationsearch");
  };

  const goToSettingsPage = () => {
    navigate("/settingpage");
  };

  return (
    <div className="home-container">
      <div className="home-map">
        <button
          className="search-button"
          onClick={goToDestinationPage}
        ></button>
        {/* 하단 설정 버튼 대신 다크모드 토글 버튼 */}
        <div className="navbar-nav" style={{ padding: "10px" }}>
          <div
            style={getButtonStyle()}
            onClick={toggleDarkMode}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* <div style={getCircleStyle()}></div> */}
          </div>
        </div>
        <button className="option-button" onClick={goToSettingsPage}></button>
        <div className="home-time">
          <div className="time-display">{currentTime.toLocaleTimeString()}</div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Home;
