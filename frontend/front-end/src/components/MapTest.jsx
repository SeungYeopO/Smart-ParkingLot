// 경로 테스트 중

import React, { useState, useEffect } from "react";

const MapTest = () => {
  const [nowPosition, setNowPosition] = useState([]);
  const updateInterval = 1000; // 업데이트 간격 설정

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://i10c102.p.ssafy.io:3001/api/user/short_path/1/-1/115/99"
        );
        const nowPosition = await response.json();
        setNowPosition(nowPosition);
        console.log("데이터 수신 중:", nowPosition);

        // canvas에 경로 그리기
        const canvas = document.getElementById("mapCanvas");
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 이전 경로를 지웁니다
        ctx.beginPath();
        ctx.moveTo(nowPosition[0].pos_x * ratio, nowPosition[0].pos_y * ratio); // 시작점 설정

        nowPosition.forEach((position) => {
          ctx.lineTo(position.pos_x * ratio, position.pos_y * ratio); // 각 위치로 선 그리기
        });

        ctx.lineWidth = 5; // 선의 너비를 5픽셀로 설정
        ctx.strokeStyle = "#FF0000"; // 선의 색상 설정
        ctx.stroke(); // 선 그리기
        // 지렸다 지렸어~~~~~~~~~~~~
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    const interval = setInterval(fetchData, updateInterval);

    return () => clearInterval(interval);
  }, []);

  const ratio = 1;

  return (
    <div>
      <div className="map-container">
        <canvas id="mapCanvas" width="800" height="600"></canvas>
        {nowPosition.map((position, index) => (
          <div
            key={index}
            className="testposition-dot"
            style={{
              left: `${position.pos_x * ratio}px`,
              top: `${position.pos_y * ratio}px`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default MapTest;
