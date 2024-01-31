
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ParkingMap from "./pages/User/ParkingMap";
import DestinationMap from "./pages/User/DestinationMap";
import DrivingMap from "./pages/User/DrivingMap";
import AdminManage from "./pages/Admin/AdminManage";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminMode from "./pages/Admin/AdminMode";
import AdminCCTV from "./pages/Admin/AdminCCTV";
import AdminStatus from "./pages/Admin/AdminStatus";
import Login from "./pages/User/Accounts/Login";
import Signup from "./pages/User/Accounts/Signup";
import Profile from "./pages/User/Accounts/Profile";
import AdminLogic from "./pages/Admin/AdminLogic";
import './App.css'; // CSS 파일 임포트
import ParkingLot from './components/ParkingLot';
import MyCar from './components/MyCar';
import WebSocket from './components/WebSocket';
import DestinationStatus from './components/DestinationStatus';
import ParkingStatus from './components/ParkingStatus';



const App = () => {
  return (
      <BrowserRouter>
        <div className="App">
          {/* <div className="container"> */}
          <Routes>
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/adminmode" element={<AdminMode />} />
            <Route path="/admincctv" element={<AdminCCTV />} />
            <Route path="/adminmanage" element={<AdminManage />} />
            <Route path="/adminstatus" element={<AdminStatus />} />
            <Route path="/adminlogic" element={<AdminLogic />} />

            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/destinationmap" element={<DestinationMap />} />
            <Route path="/drivingmap" element={<DrivingMap />} />
            <Route path="/ParkingMap" element= {<ParkingMap />} />
          </Routes>
          {/* </div> */}
        </div>
      </BrowserRouter>
      //

  );
};

export default App;
