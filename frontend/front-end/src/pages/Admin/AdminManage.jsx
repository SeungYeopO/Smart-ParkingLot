// 나중엔 지울 페이지인데 여기에다가 맵 띄우는거 테스트 하는 중이예요


import React from 'react';
import CarWidthModal from './../../components/Modal/CarWidthModal';
import { useState } from 'react';
import MapTest from './../../components/MapTest';
import OriginalParkingLot from './../../components/OrginalParkingLot';
const AdminManage = () => {
  
    return (
      <div className='map-container'>
        <OriginalParkingLot />
        <MapTest />
  
      </div>
    );
};

export default AdminManage