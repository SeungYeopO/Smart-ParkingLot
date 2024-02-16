import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [carnumber, setCarnumber] = useState("");
  const [isUsernameUnique, setIsUsernameUnique] = useState(null);
  const [isCarnumberUnique, setIsCarnumberUnique] = useState(null);
  const [carnumberMessage, setCarnumberMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [carType, setCarType] = useState("");
  const [specialMessage, setSpecialMessage] = useState("");
  const [electricCar, setElectricCar] = useState(""); // 전기차 여부 상태
  const [disabledCar, setDisabledCar] = useState(""); // 장애인 차량 여부 상태
  const navigate = useNavigate();

  // 비밀번호 일치 확인 함수
  const checkPasswordMatch = () => {
    if (password !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError("");
    }
  };

  // 중복 확인 처리 함수 => 백엔드 연결 후 다시 검토
  const checkUsername = async () => {
    if (!username) {
      setUsernameMessage("User ID를 입력해주세요.");
      return;
    }
    try {
      const response = await fetch("/api/check-username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setIsUsernameUnique(data.isUnique);

      // 중복 상태에 따라 메시지 설정
      if (data.isUnique) {
        setUsernameMessage("사용할 수 있는 ID입니다.");
      } else {
        setUsernameMessage("이미 사용중인 User ID입니다.");
      }
    } catch (error) {
      console.error("중복 확인 중 문제가 발생했습니다:", error);
      setUsernameMessage("중복 확인 중 오류가 발생했습니다.");
    }
  };

  // 차량 번호 중복확인 => 이것도 백엔드 들어오면 고려

  // 회원가입 처리 함수
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      return; // 비밀번호가 일치하지 않으면 함수 실행을 중지
    } else {
      setPasswordError(""); // 비밀번호가 일치하면 오류 메시지를 초기화
    }

    if (!username) {
      setUsernameMessage("User ID를 입력해주세요.");
      return;
    }
    if (!isUsernameUnique) {
      alert("User ID가 중복되었습니다. 다른 ID를 입력해 주세요.");
      return;
    }
    if (
      password &&
      username &&
      isUsernameUnique &&
      password === confirmPassword
    ) {
      navigate("/");
    }
  };

  // 차량 종류 변경 핸들러
  const handleCarTypeChange = (e) => {
    setCarType(e.target.value);
  };

  // 전기차 여부 변경 핸들러
  const handleElectricCarChange = (e) => {
    setElectricCar(e.target.value);
  };

  // 장애인 차량 여부 변경 핸들러
  const handleDisabledCarChange = (e) => {
    setDisabledCar(e.target.value);
    if (e.target.value === "장애인") {
      setSpecialMessage(
        <span style={{ color: "red" }}>
          비장애인이실 경우 불이익을 받으실 수 있습니다.
        </span>
      );
    } else {
      setSpecialMessage("");
    }
  };

  return (
    <div className="admin-login">
      <div className="login-border">
        <div className="login-logo">
          <h2 style={{ color: "white" }}>최적의 주차</h2>
          <h2 style={{ color: "#6373e8" }}>Auto Parking</h2>
          {/* <h6 style={{ color: "white", marginLeft: "150px" }}>for user</h6> */}
          <img
            className="animate__animated animate__bounceOutUp"
            src="./assets/car.png"
            alt="logo"
            style={{ width: "200px", marginTop: "50px" }}
          />
        </div>
        <div className="login-login">
          <h2 style={{ marginBottom: "30px" }}>회원 가입</h2>
          <form onSubmit={handleSignup}>
            <div>
              <input
                type="text"
                className="usr-id"
                placeholder="User Id"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <button className="signup-button" onClick={checkUsername}>
                중복확인
              </button>
              <p className="username-message">{usernameMessage}</p>
            </div>
            <div className="sign-password">
              <input
                type="password"
                className="input-no-border"
                placeholder="User Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="sign-password">
              <input
                type="password"
                className="input-no-border"
                placeholder="Check Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={checkPasswordMatch} // 포커스가 벗어났을 때 검증
              />
              {passwordError && (
                <p className="password-error">{passwordError}</p>
              )}
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
            <div>
              <select
                className="input-no-border"
                value={carType}
                onChange={handleCarTypeChange}
                style={{ color: carType === "" ? "gray" : "black" }}
              >
                <option value="">차량 종류를 선택해주세요</option>
                <option value="SUV">SUV</option>
                <option value="세단">세단</option>
                <option value="경차">경차</option>
              </select>
            </div>
            <div>
              <select
                className="input-no-border"
                value={electricCar}
                onChange={handleElectricCarChange}
                style={{ color: electricCar === "" ? "gray" : "black" }}
              >
                <option value="">전기차 여부</option>
                <option value="전기차O">전기차O</option>
                <option value="전기차X">전기차X</option>
              </select>
            </div>
            <div>
              <select
                className="input-no-border"
                value={disabledCar}
                onChange={handleDisabledCarChange}
                style={{ color: disabledCar === "" ? "gray" : "black" }}
              >
                <option value="" style={{ color: "gray" }}>
                  장애인 차량 여부
                </option>
                <option value="비장애인">비장애인</option>
                <option value="장애인">장애인</option>
              </select>
              {specialMessage && (
                <p className="special-message">{specialMessage}</p>
              )}
            </div>
            <div className="user-signup">
              <button
                type="submit"
                disabled={
                  isUsernameUnique === null ||
                  passwordError ||
                  !password ||
                  !confirmPassword
                }
                onClick={handleSignup}
              >
                Create Account
              </button>
            </div>
            <p>
              Already have an account? <Link to="/">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
