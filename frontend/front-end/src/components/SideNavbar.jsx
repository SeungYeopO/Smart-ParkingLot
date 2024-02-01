import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 CSS 임포트

const SideNavbar = () => {
  return (
    <nav
      className="navbar navbar-light"
      style={{
        backgroundColor: "#191a2b",
        width: "130px",
        height: "100vh",
        display: "flex",
        flexDirection: "column", // 컨테이너를 세로 방향으로 설정
        justifyContent: "space-between", // 상단과 하단 내용 사이에 공간 생성
      }}
    >
      <div className="nav-hover">
        <a className="navbar-brand" href="/parkingmap">
          <p>Auto<br/>Parking</p>
        </a>
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="/drivingmap">
            <img src="./assets/Home.png" alt="home" style={{ marginRight: "1px" }} /> 
          </a>
          <a className="nav-item nav-link" href="/help">
            <img src="./assets/Notifications.png" alt="notifications" />
          </a>
          <a className="nav-item nav-link" href="/profile">
            <img src="./assets/Person.png" alt="person" />
          </a>
        </div>
      </div>

      <div className="navbar-nav">
        <a className="nav-item nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">
          <img src="./assets/Group.png" alt="setting" />
        </a>
      </div>
    </nav>
  );
};

export default SideNavbar;
