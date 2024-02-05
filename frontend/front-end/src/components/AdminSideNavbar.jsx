import React from "react";
import {Link} from 'react-router-dom';

const AdminSideNavbar = () => {

  const goToCCTVmode = () => {
    
  }

  return (
    <div
      className="nav-sidebar"
      style={{
        backgroundColor: "#273142",     
        width: "130px",    
        height: "100vh",    
        display: "flex",   
        flexDirection: "column", // 컨테이너를 세로 방향으로 설정
        justifyContent: "space-between", // 상단과 하단 내용 사이에 공간 생성
      }}
    >
        <div>
         <a className="logo-letter" href="/adminmode">
            < div className="letter-auto">Auto</div>
              <div>Parking</div>
         </a>
            <div className="mode1-cctv" onClick={goToCCTVmode}>
              <Link to="/admincctv">CCTV</Link>
            </div>

            <div className="mode2-status">
              <Link to="/adminstatus">주차현황</Link>      
            </div>

            <div className="mode3-manage">
              <Link to="/adminmanage">주차관리</Link>
            </div>
            <div className="mode4-logic">
                <Link to="/adminlogic">로직변경</Link>
            </div>
        </div>
    </div>
  );
};

export default AdminSideNavbar