// npm install npm install socket.io-client
// frontend => 클라이언트 소켓
// react server => localhost3000

import React from 'react';
import CCTV from './../../components/CCTV';
import AdminSideNavbar from './../../components/AdminSideNavbar';
import AdminUpNavbar from './../../components/AdminUpNavbar';

const AdminCCTV = () => {
 
  return (
    <div className='cctvbg'>
       <AdminUpNavbar />
       <div style={{display : 'flex'}}>
       <div>
      <AdminSideNavbar />
       </div>
      <div>
          <div className='camNum1'>     
            <div className='cctv-img'><img src="/assets/cctv.png" alt="cctv" /></div>
            <div className='letter-cam1'>CAM1</div>   
          </div>
          <div className='real-cctv'>
            <CCTV />
          </div>
    
      </div>

       </div>
      
    </div>
  );
};

export default AdminCCTV;