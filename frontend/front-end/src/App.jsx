import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css"; // CSS 파일 임포트
import ParkingMap from "./pages/User/ParkingMap";
import DestinationMap from "./pages/User/DestinationMap";
import DrivingMap from "./pages/User/DrivingMap";
import AdminManage from "./pages/Admin/AdminManage";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminMode from "./pages/Admin/AdminMode";
import AdminCCTV from "./pages/Admin/AdminCCTV";
import AdminStatus from "./pages/Admin/AdminStatus";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          {/* <div className="container"> */}
          <Routes>
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/adminmode" element={<AdminMode />} />
            <Route path="/admincctv" element={<AdminCCTV />} />
            <Route path="/adminmanage" element={<AdminManage />} />
            <Route path="/adminstatus" element={<AdminStatus />} />

            <Route path="/destinationmap" element={<DestinationMap />} />
            <Route path="/drivingmap" element={<DrivingMap />} />
            <Route path="/" element={<ParkingMap />} />
          </Routes>
          {/* </div> */}
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
