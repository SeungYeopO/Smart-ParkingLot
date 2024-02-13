import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 불러오기

const SettingPage = () => {
  const [currentTime, setCurrentTime] = useState("");
  const navigate = useNavigate(); // useNavigate 사용

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () => {
    navigate("/userprofile");
  };

  const handleBackClick = () => {
    navigate("/home");
  };

  return (
    <div className="menu-container">
      <div className="menu-page">
        <div className="menu-time">
          <div className="back">
            <button onClick={handleBackClick}></button>
          </div>
          <div className="menu-times">{currentTime}</div>
        </div>
        <div className="mycar">
          <button onClick={handleButtonClick}></button>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
