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
    if (canvas && nowPosition.length > 0) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 이전 경로를 지웁니다
  
      // 전체 경로 그리기
      ctx.beginPath();
      ctx.moveTo(nowPosition[0].pos_x * ratio, nowPosition[0].pos_y * ratio);
      nowPosition.forEach((position) => {
        ctx.lineTo(position.pos_x * ratio, position.pos_y * ratio);
      });
      ctx.lineWidth = 7;
      ctx.strokeStyle = "red";
      ctx.stroke();
  
      // 마지막 위치부터 주차 공간까지 점선 그리기
      const lastPos = nowPosition[nowPosition.length - 1];
      console.log(lastPos)     //328
      
      ctx.setLineDash([4, 10]); // 점선 패턴 설정
      ctx.beginPath();
      ctx.moveTo(lastPos.pos_x * ratio, lastPos.pos_y * ratio);
      console.log(lastPos.pos_x)
      
      // 주차 공간까지의 점선 경로를 계산하여 그리기
      console.log(ratio)
      ctx.lineTo((Number(lastPos.pos_x) + 50) * ratio, lastPos.pos_y * ratio);
      ctx.strokeStyle = "yellow"; // 점선 색상
      ctx.stroke();
  
      // 점선 설정을 초기화
      ctx.setLineDash([]);
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

