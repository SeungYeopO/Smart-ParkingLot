// npm install npm install socket.io-client
// frontend => 클라이언트 소켓
// react server => localhost3000

import React from 'react';
import CCTV from './../../components/CCTV';
import AdminSideNavbar from './../../components/AdminSideNavbar';
import AdminUpNavbar from './../../components/AdminUpNavbar';


const AdminCCTV = () => {
 
  return (
    <div>
       <AdminUpNavbar />
      <div style={{display : 'flex'}}>
        <AdminSideNavbar />
          <div>
            <p></p>
          </div>
        
      </div>
    </div>
  );
};

export default AdminCCTV;