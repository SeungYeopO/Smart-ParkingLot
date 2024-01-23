import React from 'react';
import './App.css'; // CSS 파일 임포트
import ParkingLot from './components/ParkingLot';
import MyCar from './components/MyCar';

const App = () => {
  return (
    <div className='App'>
      <ParkingLot />
     <MyCar />
    </div>
  );
};

export default App;
