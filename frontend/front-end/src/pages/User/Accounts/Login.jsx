import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // useState를 사용하여 username과 password 상태 관리
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [animate, setAnimate] = useState(false); // 애니메이션 상태 추가
  const navigate = useNavigate();

  // 로그인 처리 함수
  const handleLogin = (e) => {
    e.preventDefault();
    setAnimate(true);
    setTimeout(() => {
      console.log(username, password);
      navigate("/searchmap"); // 로그인 후 이동할 경로
      setAnimate(false); // 애니메이션 종료 후 상태 초기화
    }, 2000);
  };

  // 경로 이동 함수
  const handleSignup = (e) => {
    // 회원가입 버튼 이벤트 핸들러
    e.preventDefault();
    navigate("/signup"); // 여기로 경로 이동
  };

  return (
    <div className="admin-login">
      <div className="login-border">
        <div className="login-logo">
          <h2 style={{ color: "white" }}>최적의 주차</h2>
          <h2 style={{ color: "#6373e8" }}>Auto Parking</h2>
          {/* <h6 style={{ color: "white", marginLeft: "150px" }}>for user</h6> */}
          <img
            className={`animate__animated ${
              animate ? "animate__bounceOutUp" : ""
            }`}
            src="./assets/car.png"
            alt="logo"
            style={{ width: "200px", marginTop: "50px" }}
          />
        </div>
        <div className="login-login">
          <h2 style={{ marginBottom: "30px" }}>로그인</h2>
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
            <div className="user-login">
              <button type="submit" style={{ marginRight: "10px" }}>
                Login
              </button>
              <button type="button" onClick={handleSignup}>
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
