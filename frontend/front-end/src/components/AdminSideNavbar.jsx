import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 CSS 임포트

const AdminSideNavbar = () => {
  return (
    <nav
      className="navbar navbar-light"
      style={{
        backgroundColor: "#a1bbf4",
        width: "130px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column", // 컨테이너를 세로 방향으로 설정
        justifyContent: "space-between", // 상단과 하단 내용 사이에 공간 생성
      }}
    >
      <div>
        <a className="navbar-brand" href="#">
          브랜드
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
      </div>
    </nav>
  );
};

export default AdminSideNavbar;
