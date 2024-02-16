import React from 'react';
import { useState, useEffect } from 'react';

const AdminUpNavbar = () => {
    const [nowTime, setNowTime] = useState(new Date());
   
    useEffect(() => {
        const timerId = setInterval(() => {
            setNowTime(new Date());
        },1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);
    
    const formattedTime = nowTime.toLocaleTimeString("ko-KR");

    return (
        <div>
            <div className="nav-bar2">
        <div className="nav-logo">
        <a className="logo-letter" href="/adminmode">
            <img src="./assets/logo.png" alt="logo" />
         </a>
        </div>
        <div className="nav-title">
          <p>{formattedTime}</p>
        </div>
      <div className="nav-user-info">
        <img src="/assets/usericon.png" alt="User Avatar" className="user-avatar" />
        <span className="user-name">사용자</span>
      </div>
    </div>
            
        </div>
    );
};

export default AdminUpNavbar;