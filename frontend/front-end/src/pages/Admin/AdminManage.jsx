import React from 'react';
import AdminUpNavbar from '../../components/AdminUpNavbar';

const AdminLogic = () => {
    return (
        <div >
            <AdminUpNavbar />
            <div style={{display : 'flex'}} className='floor-select'>
                <p>floor:</p>
                <div>
                    <select
                        className="floor-select-box">
                        <option value="1">B1</option>
                        <option value="2">B2</option>
                    </select>
                </div>                  
            </div>
            <div>

            </div>
        </div>
    );
};

export default AdminLogic;
