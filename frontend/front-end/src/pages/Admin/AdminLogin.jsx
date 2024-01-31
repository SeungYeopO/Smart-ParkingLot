import React, { useState } from "react";

const AdminLogin = () => {
  // useState를 사용하여 username과 password 상태 관리
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 처리 함수
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(username, password); // 사용자 이름과 비밀번호를 콘솔에 출력
  };

  return (
    <div className="admin-login">
      <div className="login-border">
        <div className="login-logo">
          <h2 style={{ color: "white" }}>최적의 주차</h2>
          <h2 style={{ color: "#6373e8" }}>Auto Parking</h2>
          <h6 style={{ color: "white", marginLeft: "150px" }}>for admin</h6>
          <img
            className="animate__animated animate__bounceOutUp"
            src="./assets/car.png"
            alt="logo"
            style={{ width: "200px", marginTop: "50px" }}
          />
        </div>
        <div className="login-login">
          <h2 style={{ marginBottom: "30px" }}>관리자 계정 인증</h2>
          <form onSubmit={handleLogin}>
            <div>
              <input
                type="text"
                className="input-no-border"
                placeholder="Put your Parking Lot's Token number"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                className="input-no-border"
                placeholder="Put your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Verify</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
