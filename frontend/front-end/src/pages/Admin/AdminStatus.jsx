import React, { useState } from 'react';
import AdminSideNavbar from '../../components/AdminSideNavbar';
import AdminUpNavbar from '../../components/AdminUpNavbar';
import AdminParkingLot from './../../components/AdminParkingLot';

const AdminStatus = () => {
  const [floorId, setFloorId] = useState('1');

  const destinationMapStyle = {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    marginLeft: '30px'
  };

  const handleFloorChange = (event) => {
    const selectedValue = event.target.value;
    console.log(`Selected floor: ${selectedValue}`); // 콘솔에 선택된 층의 값을 출력
    setFloorId(selectedValue); // 상태를 업데이트
  };

  return (
    <div>
      <AdminUpNavbar />
      <div style={{ display: 'flex' }}>
        <div>
          <AdminSideNavbar />
        </div>
        <div>
          <div>
            <div className='func-name'>
              <p>Status</p>
            </div>
            <div className='floor-status' style={{ display: 'flex' }}>
              <div>
                <select
                  className="floor-select-box"
                  onChange={handleFloorChange}
                >
                  <option value="1">B1</option>
                  <option value="2">B2</option>
                </select>
              </div>
              <div className="status-box">
                <img src="/assets/checkgreen.png" alt="checkimg" />
                <p style={{ display: 'inline-block', marginLeft: '20px', marginTop: '40px', fontSize: 'large' }}>현재 대수 / 전체 대수</p>
              </div>
            </div>
            <div className='status-notify'>
              <img src="/assets/notification.png" alt="알림img" />
              <p style={{ display: 'inline-block' }}>주차장이 원활합니다.</p>
            </div>
            <div style={destinationMapStyle}>
              <AdminParkingLot />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatus;
