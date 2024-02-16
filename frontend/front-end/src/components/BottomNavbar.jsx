import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BottomNavbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  const goToHelpPage = () => {
    navigate('/help');
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("ko-KR");

  return (
    <div className="bottom-navbar">
      <div className="nav-item">
        <img src="./assets/flag.png" alt="flag" />
        롯데마트 수완점
      </div>
      <div className="nav-item">{formattedTime}</div>
      <div className="nav-item" onClick={goToHelpPage}>
        <img src="./assets/reload.png" alt="Reload" />
      </div>
    </div>
  );
};

export default BottomNavbar;
