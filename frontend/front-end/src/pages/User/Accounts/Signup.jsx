import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // useState를 사용하여 username과 password 상태 관리
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayPassword, setDisplayPassword] = useState("");
  const [carnumber, setCarnumber] = useState("");
  const navigate = useNavigate(); 

  // 로그인 처리 함수
  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(username, password); // 사용자 이름과 비밀번호를 콘솔에 출력
  };

  // 경로 이동 함수
  const handleSignup = (e) => { // 회원가입 버튼 이벤트 핸들러
    e.preventDefault();
    navigate('/') // 여기로 경로 이동
  }

  return (
    <div className="admin-login">
      <div className="login-border">
        <div className="login-logo">
          <h2 style={{ color: "white" }}>최적의 주차</h2>
          <h2 style={{ color: "#6373e8" }}>Auto Parking</h2>
          {/* <h6 style={{ color: "white", marginLeft: "150px" }}>for user</h6> */}
          <img
            src="./assets/car.png"
            alt="logo"
            style={{ width: "200px", marginTop: "50px" }}
          />
        </div>
        <div className="login-login">
          <h2 style={{marginBottom: "30px"}}>회원 가입</h2>
          <form onSubmit={handleLogin}>
            <div>
              <input
                type="text"
                className="input-no-border"
                placeholder="User Id"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button className="signup-button" ></button>
            </div>
            <div>
              <input
                type="password"
                className="input-no-border"
                placeholder="User Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                className="input-no-border"
                placeholder="차량 번호를 입력해주세요."
                value={carnumber}
                onChange={(e) => setCarnumber(e.target.value)}
              />
            </div>
            <div className="user-signup">
              <button type="submit" onClick={handleSignup}>Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
