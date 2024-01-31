import React from 'react';

const NavBar = () => {
  return (
    <header className="nav-bar">
      <div className="nav-logo">
        <img src="/assets/car_logo.png" alt="Logo" />
      </div>
      <div className="nav-title-date">
        <p>2024.01.29 11:12:03</p>
      </div>
      <div className="nav-user-info">
        <img src="/assets/usericon.png" alt="User Avatar" className="user-avatar" />
        <span className="user-name">사용자</span>
      </div>
    </header>
  );
};

const AdminMap = () => {
  return (
    <div>
      <NavBar />
    </div>
  );
};

export default AdminMap;
