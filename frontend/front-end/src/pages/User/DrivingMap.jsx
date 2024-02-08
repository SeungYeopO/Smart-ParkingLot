import React, { useState, useEffect } from "react";
import SideNavbar from "../../components/SideNavbar";
import BottomNavbar from "../../components/BottomNavbar";
import ParkingLot from "../../components/ParkingLot";
import MapTestDriving from "../../components/MapTestDriving";

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
      <ParkingLot />
      <MapTestDriving />

      <BottomNavbar />
      </div>
    </div>
  );
};

export default DrivingMap;
