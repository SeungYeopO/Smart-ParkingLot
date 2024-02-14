import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideNavbar from "../../components/SideNavbar";
import BottomNavbar from "../../components/BottomNavbar";

const DestinationMap = () => {
  const stepSize = 30; // 한 칸당 이동 거리 (px 단위)
  const [arrowPosition, setArrowPosition] = useState({
    top: 600,
    left: 680,
    rotate: 0,
  });
  const [mapScale, setMapScale] = useState(1); // 맵 확대를 위한 상태
  const navigate = useNavigate();

  useEffect(() => {
    const forwardInterval = setInterval(() => {
      setArrowPosition((prev) => ({
        ...prev,
        top: prev.top - stepSize,
      }));
    }, 200);

    let rightTurnInterval;

    setTimeout(() => {
      clearInterval(forwardInterval);
      setArrowPosition((prev) => ({
        ...prev,
        rotate: 90, // 우회전으로 변경
      }));

      rightTurnInterval = setInterval(() => {
        setArrowPosition((prev) => ({
          ...prev,
          left: prev.left + stepSize, // 우회전 이동
        }));
      }, 200);

      setTimeout(() => {
        clearInterval(rightTurnInterval);
        setMapScale(2.5); // 맵 확대

        setTimeout(() => {
          navigate("/parkingmap"); // 2초 후 '/parkingmap'으로 이동
        }, 2000);
      }, 400); // 우회전
    }, 1000); // 직진

    return () => {
      clearInterval(forwardInterval);
      clearInterval(rightTurnInterval);
    };
  }, [navigate]);

  const destinationMapStyle = {
    width: "1300px", // 전체 너비를 차지하도록 설정
    height: "100vh",
    position: "relative",
    overflow: "hidden",
  };

  const mapContainerStyle = {
    position: "absolute", // 확대 시 위치 고정
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%) scale(${mapScale})`, // 중앙에서 확대
    transformOrigin: `${arrowPosition.left}px ${arrowPosition.top}px`, // 화살표가 있는 곳에서 확대
    transition: "transform 1s ease-in-out", // 부드러운 확대 효과
    width: "1300px", // 컨테이너 크기 설정
    height: "100vh", // 컨테이너 크기 설정
    overflow: "hidden", // 이미지가 컨테이너를 넘어서지 않도록 설정
  };

  // 이미지에 적용할 스타일
  const imgStyle = {
    maxWidth: "1300px", // 이미지 최대 너비를 컨테이너의 100%로 설정
    height: "100vh", // 이미지 높이를 자동으로 설정하여 비율 유지
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

      <div className="destination-map" style={destinationMapStyle}>
        <div className="map-container" style={mapContainerStyle}>
          <img
            src="./assets/desttest.jpg"
            // src="./assets/destination.png"
            alt="Destination Map"
            style={imgStyle}
          />

          <img // 여기서 svg를 img 태그로 변경
            src="./assets/car.png" // car.png 이미지로 변경
            alt="Car Icon"
            style={arrowStyle} // 화살표 스타일 적용
          />
        </div>
        <BottomNavbar />
      </div>
    
  );
};

export default DestinationMap;
