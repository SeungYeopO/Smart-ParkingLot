import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Intropage = () => {
  const navigate = useNavigate();
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    const animationDuration = 5000; // 애니메이션 지속 시간 (5초)
    const timeout = setTimeout(() => {
      setAnimationFinished(true);
      // 5초 후에 '/home' 경로로 이동합니다.
      setTimeout(() => {
        navigate('/');
      }, 5000);
    }, animationDuration);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <>
      <div className={`intro-back ${animationFinished ? "fade-out" : ""}`}>
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#0e1b1e",
          }}
        >
          <img src="../assets/intromap.png" alt="" style={{ width: "700px" }} />
        </div>
        <div>
          <img
            src="../assets/introcar.png"
            alt=""
            className={`car ${animationFinished ? "drive-out" : ""}`}
          />
        </div>
      </div>
      {animationFinished && (
        <div className="hello-text-background">
          <div className="hello-text">
            <h1>&nbsp;주차 때문에 <br/><span className="highlight">애쓰지마</span>세요</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Intropage;
