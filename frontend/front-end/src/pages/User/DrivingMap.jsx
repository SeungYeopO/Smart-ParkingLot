import React, { useState, useEffect } from "react";
import SideNavbar from "../../components/SideNavbar";
import BottomNavbar from "../../components/BottomNavbar";

const DrivingMap = () => {
  const destinationMapStyle = {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  };

  return (
    <div className="parkingLot" style={{ height: "100vh", display: "flex" }}>
      <SideNavbar />
      <div style={destinationMapStyle}>
        이 페이지 어카누,.,
        <BottomNavbar />
      </div>
    </div>
  );
};

export default DrivingMap;
