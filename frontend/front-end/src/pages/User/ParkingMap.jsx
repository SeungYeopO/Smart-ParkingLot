import React, { useState } from "react";
import ParkingLot from "../../components/ParkingLot";
import SideNavbar from "../../components/SideNavbar";

const ParkingMap = () => {
  return (
    <div className="parkingLot" style={{ height: "100vh" }}>
      <SideNavbar />
      <div style={{ flexGrow: 1, overflow: 'auto' }}>
        <ParkingLot />
      </div>
    </div>
  );
};

export default ParkingMap;
