import React, { useState } from "react";
import ParkingLot from "../../components/ParkingLot";

const ParkingMap = () => {
  return (
    <div className="parkingLot">
      {/* <p>주차장 전체 현황 및 주요 기능을 보여주는 페이지 입니다.</p> */}
      <ParkingLot />
    </div>
  );
};

export default ParkingMap;
