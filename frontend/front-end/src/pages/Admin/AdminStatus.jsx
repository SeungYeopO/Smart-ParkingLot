import React from 'react';
import AdminSideNavbar from '../../components/AdminSideNavbar';
import MapTest from '../../components/MapTest';
import ParkingLot from '../../components/ParkingLot';

const AdminStatus = () => {
  return (
      <div style={{display: 'flex'}}>
        <AdminSideNavbar />
        <div>
          <div className='func-name'>
              <p>status</p>
          </div>
          <div className='floor-status' style={{display:'flex'}}>
            <select
              className="floor-select-box">
              <option value="b1">B1</option>
              <option value="b2">B2</option>
              <option value="b3">B3</option>
            </select>
            <div >
              <img src="/assets/checkgreen.png" alt="checkimg" />
              <p>현황</p>
            </div>    
          </div>
          <div className='admin-notify'>
            <p>주차장이 원활합니다.</p>
          </div>
          <div>
            {/* <ParkingLot /> */}
            {/* <MapTest /> */}
          </div>
          </div>
        </div>

      
  )
};

export default AdminStatus;