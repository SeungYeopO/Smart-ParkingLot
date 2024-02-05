import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideNavbar from "../../components/SideNavbar";
import BottomNavbar from "../../components/BottomNavbar";

const DestinationMap = () => {
  const stepSize = 50; // 한 칸당 이동 거리 (px 단위)
  const [arrowPosition, setArrowPosition] = useState({
    top: 550,
    left: 750,
    rotate: 0,
  });
  const [mapScale, setMapScale] = useState(1); // 맵 확대를 위한 상태
  const navigate = useNavigate();

  useEffect(() => {
    const forwardInterval = setInterval(() => {
      setArrowPosition(prev => ({
        ...prev,
        top: prev.top - stepSize,
      }));
    }, 200);

    let leftTurnInterval;

    setTimeout(() => {
      clearInterval(forwardInterval);
      setArrowPosition(prev => ({
        ...prev,
        rotate: -90,
      }));

      leftTurnInterval = setInterval(() => {
        setArrowPosition(prev => ({
          ...prev,
          left: prev.left - stepSize,
        }));
      }, 200);

      setTimeout(() => {
        clearInterval(leftTurnInterval);
        setMapScale(2.5); // 맵 확대

        setTimeout(() => {
          navigate('/parkingmap'); // 2초 후 '/parkingmap'으로 이동
        }, 2000);
      }, 400); // 좌회전
    }, 1000); // 직진 

    return () => {
      clearInterval(forwardInterval);
      clearInterval(leftTurnInterval);
    };
  }, [navigate]);

  const destinationMapStyle = {
    flex: 1,
    position: "relative",
    overflow: "hidden", // 맵이 이 div를 넘어서지 않도록 설정
  };

  const mapContainerStyle = {
    position: "absolute", // 확대 시 위치 고정
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%) scale(${mapScale})`, // 중앙에서 확대
    transformOrigin: "center center", // 확대 중심점 설정
    transition: "transform 1s ease-in-out", // 부드러운 확대 효과
    width: "100%", // 컨테이너 크기 설정
    height: "100%", // 컨테이너 크기 설정
  };

  const arrowStyle = {
    position: "absolute",
    top: `${arrowPosition.top}px`,
    left: `${arrowPosition.left}px`,
    transform: `translate(-50%, -50%) rotate(${arrowPosition.rotate}deg)`,
    transition: "top 200ms linear, left 200ms linear, transform 200ms linear",
    width: "50px",
    height: "50px",
  };

  return (
    <div style={{ display: "flex" }}>
      <SideNavbar />
      <div className="destination-map" style={destinationMapStyle}>
        <div className="map-container" style={mapContainerStyle}>
          <img src="./assets/destinationmap.png" alt="Destination Map" />
          <svg style={arrowStyle} viewBox="0 0 24 24">
            <path fill="red" d="M12 2L1 21h22L12 2zm0 4.83L17.6 19H6.4L12 6.83z" />
          </svg>
        </div>
      <BottomNavbar />
      </div>
    </div>
  );
};

export default DestinationMap;
