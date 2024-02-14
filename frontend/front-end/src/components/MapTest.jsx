import React, { useState, useEffect } from "react";
import RealTimeCarRoute from './RealTimeCarRoute';
import EndRouteInfoModal from './Modal/EndRouteInfoModal';


const MapTest = () => {
  const [nowPosition, setNowPosition] = useState([]);
  const updateInterval = 1000; // 업데이트 간격 설정
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ratio = 1.3;
       
  // 데이터를 가져와서 상태를 업데이트하는 함수
  const fetchData = async () => {
      try { 
        const response = await fetch("https://i10c102.p.ssafy.io:3001/api/user/short_path/1");
        const data = await response.json();
        console.log("데이터 수신 중:", data);
        setNowPosition(data); // 처음 데이터를 로드한 후 상태를 업데이트
       
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      
    } 
  };

  useEffect(() => {
    if(nowPosition.length === 1){
      setIsModalOpen(true);
    }
  }, [nowPosition])

  // Canvas에 경로를 그리는 함수
  const drawPath = () => {
    const canvas = document.getElementById("mapCanvas");
    if (canvas && nowPosition.length > 0) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 이전 경로 지우기
 
        // 주 경로 그리기
        ctx.beginPath();
        ctx.moveTo(nowPosition[0].pos_x * ratio, nowPosition[0].pos_y * ratio);
        nowPosition.forEach((position) => {
            console.log(position)
            ctx.lineTo(position.pos_x * ratio, position.pos_y * ratio);
        });
        ctx.lineWidth = 7; // 선의 너비 조정
        ctx.strokeStyle = "green"; // 경로 색상
        ctx.stroke();

        // 마지막 점에 도달하지 않았을 때만 주차 자리까지의 점선 그리기
        if (nowPosition.length > 1) { // 현재 위치 이후에 더 이동할 점이 있는지 확인
            const lastPos = nowPosition[nowPosition.length - 1];
            ctx.setLineDash([4, 10]); // 점선 패턴 설정
            ctx.beginPath();
            ctx.moveTo(lastPos.pos_x * ratio, lastPos.pos_y * ratio);
            ctx.lineTo((Number(lastPos.pos_x) + 50) * ratio, lastPos.pos_y * ratio); // 길이 및 방향 조정 필요
            ctx.strokeStyle = "green"; // 점선 색상
            ctx.stroke();
            ctx.setLineDash([]); 
        }
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
  }); 

 // MapTest 컴포넌트 내부의 return 문 수정
 return (
  <div className="route-canvas">
    <canvas id="mapCanvas" width="800" height="600"></canvas>
    <RealTimeCarRoute currentPosition={nowPosition[0]} />
    <EndRouteInfoModal isOpen={isModalOpen}> {/* isOpen prop 전달 */}
      <p style={{fontSize : 'x-large'}}>주차 안내를 종료합니다.</p>
    </EndRouteInfoModal>
  </div>
);

};



export default MapTest;

