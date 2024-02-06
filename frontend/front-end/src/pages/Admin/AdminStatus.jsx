import React from 'react';
import AdminSideNavbar from '../../components/AdminSideNavbar';
import MapTest from '../../components/MapTest';
import ParkingLot from '../../components/ParkingLot';
import AdminUpNavbar from '../../components/AdminUpNavbar';
import { useEffect, useState } from 'react';
import AdminParkingLot from './../../components/AdminParkingLot';
import SideNavbar from './../../components/SideNavbar';


const AdminStatus = () => {
  
  const [floorId, setFloorId] = useState('1')

  const destinationMapStyle = {
    flex: 1,
    position: "relative",
    overflow: "hidden", 
  };
  
  const fetchFloorData = async (seletedFloorId) => {
    const response = await fetch('url')
    const data = await response.json();
  };
  useEffect(() => {
    fetchFloorData(floorId);
  },[floorId]);

  const handleFloorChange = (event) =>{
    const selectedValue = event.target.value;
    console.log(`Selected floor: ${selectedValue}`); // 콘솔에 선택된 층의 값을 출력
    setFloorId(selectedValue); // 상태를 업데이트
  }

  return (
    <div>
        <AdminUpNavbar />
        <div style={{display : 'flex'}}>
        <div>
        <AdminSideNavbar />
        </div>
        <div>
        <div>
          <div className='func-name'>
              <p>Status</p>
          </div>
          <div className='floor-status' style={{display:'flex'}}>
            <div>
            <select
              className="floor-select-box"
              onChange={handleFloorChange}
              >
              <option value="1">B1</option>
              <option value="2">B2</option>
            </select>
            </div>
            <div className ="status-box" >
              <img src="/assets/checkgreen.png" alt="checkimg" />
            </div>    
          </div>
          <div>
          </div>
          <div style={destinationMapStyle}>
            <AdminParkingLot />
            {/* <MapTest /> */}
          </div>
          </div>
        </div>

        </div>
       
        <div style={{display : 'none'}} >
         <SideNavbar />
        </div>
        </div>

      
  )
};

export default AdminStatus;