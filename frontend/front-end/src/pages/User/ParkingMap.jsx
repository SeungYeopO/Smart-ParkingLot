import React, { useState } from "react";
import ParkingLot from "../../components/ParkingLot";
import SideNavbar from "../../components/SideNavbar";
import BottomNavbar from "../../components/BottomNavbar";

const ParkingMap = () => {
  const destinationMapStyle = {
    flex: 1,
    position: "relative",
    overflow: "hidden", // 맵이 이 div를 넘어서지 않도록 설정
  };

  return (
    <div className="parkingLot" style={{ height: "100vh", display: "flex"}}>
      <SideNavbar />
      <div style={destinationMapStyle}>
      <ParkingLot />

      <BottomNavbar />
      </div>
    </div>
  );
};

export default ParkingMap;
