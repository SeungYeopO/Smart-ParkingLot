import React from 'react';
import './App.css'; // CSS 파일 임포트
import ParkingLot from './components/ParkingLot';
import MyCar from './components/MyCar';
import WebSocket from './components/WebSocket';
import DestinationStatus from './components/DestinationStatus';
import ParkingStatus from './components/ParkingStatus';
import AdminMap from './pages/AdminMap';

const App = () => {
  return (
    <div className='App'>
      {/* <ParkingLot /> */}
     {/* <MyCar /> */}
     {/* <WebSocket /> */}
     {/* <ParkingStatus /> */}
     <AdminMap />
    </div>
  );
};

export default App;
