import React from 'react';
import ParkingLot from '../../components/ParkingLot';
import AdminSideNavbar from '../../components/AdminSideNavbar';

const AdminLogic = () => {
    return (
        <div style={{display:'flex'}}>
            <AdminSideNavbar />
            <div>
                로직변경화면입니다.
            </div>     
        </div>
       
    );
};

export default AdminLogic;