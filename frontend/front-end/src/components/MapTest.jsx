import React, { useState, useEffect } from "react";
import RealTimeCarRoute from './RealTimeCarRoute';


const MapTest = () => {
  const [nowPosition, setNowPosition] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // 초기로드 여부를 확인
  const updateInterval = 1000; // 업데이트 간격 설정
  const ratio = 1.3;
       
  // 데이터를 가져와서 상태를 업데이트하는 함수
  const fetchData = async () => {
    if (isInitialLoad) { // 초기 로드인 경우에만 데이터를 가져옴
      try {
        const response = await fetch("/assets/route.json");
        const data = await response.json();
        console.log("데이터 수신 중:", data);
        setNowPosition(data); // 처음 데이터를 로드한 후 상태를 업데이트
        setIsInitialLoad(false); // 초기 로드 완료 표시로 바꿈
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    } else { // 초기 로드가 아닌 경우, 상태에서 첫 번째 요소를 제거
      setNowPosition(prevPositions => prevPositions.length > 1 ? prevPositions.slice(1) : prevPositions);
    }
  };

  // Canvas에 경로를 그리는 함수
  const drawPath = () => {
    const canvas = document.getElementById("mapCanvas");
    console.log(canvas)
    if (canvas && nowPosition.length > 0) {
      console.log('조건문안에 들어옴')
      console.log(nowPosition)
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 이전 경로를 지웁니다
      ctx.beginPath();
      ctx.moveTo(nowPosition[0].pos_x * ratio, nowPosition[0].pos_y * ratio); // 시작점 설정

      nowPosition.forEach((position) => {
        ctx.lineTo(position.pos_x * ratio, position.pos_y * ratio); // 각 위치로 선 그리기
      });

      ctx.lineWidth = 10; // 선의 너비 설정
      ctx.strokeStyle = "red"; // 선의 색상 설정
      ctx.stroke(); // 선 그리기
    }
  };

  // nowPosition 상태가 업데이트될 때마다 drawPath 함수를 호출
  useEffect(() => {
    drawPath();
  }, [nowPosition]);

  // 일정 간격으로 데이터를 가져오는 함수를 실행
  useEffect(() => {
    const interval = setInterval(fetchData, updateInterval);
    return () => clearInterval(interval);
  }, [isInitialLoad]); // 의존성 배열에 isInitialLoad를 추가하여 초기 로드 상태 변경 시에만 fetchData 함수가 실행되도록 함

 // MapTest 컴포넌트 내부의 return 문 수정
return (
  <div className="route-canvas">
    <canvas  id="mapCanvas" width="800" height="600"></canvas>
    <RealTimeCarRoute currentPosition={nowPosition[1]} />
  </div>
);

};



export default MapTest;