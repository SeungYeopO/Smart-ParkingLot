import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // CSS 파일 임포트
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
import Userprofile from "./pages/User/Accounts/Userprofile";
import AdminLogic from "./pages/Admin/AdminLogic";
import ParkingLot from "./components/ParkingLot";
import WebSocket from "./components/WebSocket";
import DestinationStatus from "./components/DestinationStatus";
import ParkingStatus from "./components/ParkingStatus";
import Help from "./pages/User/Accounts/Help";
import SearchMap from "./pages/User/SearchMap";
import Home from "./pages/User/Home";
import DestinationSearch from "./pages/User/DestinationSearch";
import SettingPage from "./pages/User/SettingPage";
import Intropage from "./pages/User/Intropage";
import DestinationInfo from "./pages/User/DestinationInfo";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminmode" element={<AdminMode />} />
          <Route path="/admincctv" element={<AdminCCTV />} />
          <Route path="/adminmanage" element={<AdminManage />} />
          <Route path="/adminstatus" element={<AdminStatus />} />
          <Route path="/adminlogic" element={<AdminLogic />} />
        </Routes>
        <div className="container">
          {/* 사용자 페이지들 */}
          <Routes>
            <Route path="/" element={<Intropage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/adminmode" element={<AdminMode />} />
            <Route path="/admincctv" element={<AdminCCTV />} />
            <Route path="/adminmanage" element={<AdminManage />} />
            <Route path="/adminstatus" element={<AdminStatus />} />
            <Route path="/adminlogic" element={<AdminLogic />} />
            <Route path="/intro" element={<Intropage />} />
            <Route path="/" element={<Home />} />
            <Route path="/destinationsearch" element={<DestinationSearch />} />
            <Route path="/destinationsinfo" element={<DestinationInfo />} />
            <Route path="/settingpage" element={<SettingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/userprofile" element={<Userprofile />} />
            <Route path="/help" element={<Help />} />
            <Route path="/searchmap" element={<SearchMap />} />
            <Route path="/destinationmap" element={<DestinationMap />} />
            <Route path="/drivingmap" element={<DrivingMap />} />
            <Route path="/ParkingMap" element={<ParkingMap />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
