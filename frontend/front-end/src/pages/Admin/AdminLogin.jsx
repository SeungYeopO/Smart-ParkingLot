import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [animate, setAnimate] = useState(false);
  let navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setAnimate(true); // 버튼 클릭 시 애니메이션 상태 활성화

    setTimeout(() => {
      console.log(username, password);
      navigate('/adminmode');
      setAnimate(false); // 약 2초 후 애니메이션 상태 비활성화
    }, 2000);
  };

  return (
    <div className="admin-login">
      <div className="login-border">
        <div className="login-logo">
          <h2 style={{ color: "white" }}>최적의 주차</h2>
          <h2 style={{ color: "#6373e8" }}>Auto Parking</h2>
          <h6 style={{ color: "white", marginLeft: "150px" }}>for admin</h6>
          <img
            className={`animate__animated ${animate ? "animate__bounceOutUp" : ""}`}
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
