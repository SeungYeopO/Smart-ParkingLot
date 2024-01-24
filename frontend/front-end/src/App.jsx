import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css"; // CSS 파일 임포트
import ParkingMap from "./pages/ParkingMap";
import DestinationMap from "./pages/DestinationMap";
import DrivingMap from "./pages/DrivingMap";
import AdminMap from "./pages/AdminMap";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/adminmap" element={<AdminMap />} />
            <Route path="/destinationmap" element={<DestinationMap />} />
            <Route path="/drivingmap" element={<DrivingMap />} />
            <Route path="/" element={<ParkingMap />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
