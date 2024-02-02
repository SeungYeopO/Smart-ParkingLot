import React from "react";

const AdminSideNavbar = () => {
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
         <a className="logo-letter" href="/../pages/Admin/AdminCCTV.jsx">
            <div className="letter-auto">Auto</div>
            <div>Parking</div>
         </a>
            <div className="mode1-cctv">
                <a href="">CCTV</a>
            </div>
            <div className="mode2-status">
                <a href="">주차현황</a>
            </div>
            <div className="mode3-manage">
                <a href="">주차관리</a>
            </div>
            <div className="mode4-logic">
                <a href="">로직변경</a>
            </div>
        </div>

     
      {/* <div>
      <a className="logo-letter" href="#">
      <p style={{marginLeft : "2px"}}>Auto <br />Parking</p>
        </a>
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="#">
            홈
          </a>
          <a className="nav-item nav-link" href="#">
            특징
          </a>
          <a className="nav-item nav-link" href="#">
            가격
          </a>
        </div>
      </div>

      <div className="navbar-nav">
        <a
          className="nav-item nav-link disabled"
          href="#"
          tabIndex="-1"
          aria-disabled="true"
        >
          비활성화
        </a>
      </div> */}
    </div>
  );
};

export default AdminSideNavbar