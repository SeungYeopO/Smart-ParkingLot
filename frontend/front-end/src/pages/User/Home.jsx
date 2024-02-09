import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  const goToDestinationPage = () => {
    navigate("/destinationsearch");
  };

  const goToSettingsPage = () => {
    navigate("/settingpage");
  };

  return (
    <div className="home-container">
      <div className="home-map">
        <button className="search-button" onClick={goToDestinationPage}>
          <img src="../assets/search.png" alt="" style={{ width: "30px" }} />
        </button>
        <button className="option-button" onClick={goToSettingsPage}></button>
      </div>
    </div>
  );
};

export default Home;
