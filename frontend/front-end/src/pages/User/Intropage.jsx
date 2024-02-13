import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Intropage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/home");
    }, 6000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="intro-back">
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
        <img src="../assets/intromap.png" alt="" className="intro-map" />
        <div className="car-container">
          <img src="../assets/introcar.png" alt="" className="car" />
        </div>
      </div>
    </div>
  );
};

export default Intropage;
