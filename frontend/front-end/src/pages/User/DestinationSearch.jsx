import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DestinationSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [inputStage, setInputStage] = useState(0);

  const inputs = [
    "ㄹ",
    "로",
    "롯",
    "롯ㄷ",
    "롯데",
    "롯데ㅁ",
    "롯데마",
    "롯데마ㅌ",
    "롯데마트",
    "롯데마트 ",
    "롯데마트 ㅅ",
    "롯데마트 수",
    "롯데마트 수ㅇ",
    "롯데마트 수오",
    "롯데마트 수와",
    "롯데마트 수완",
    "롯데마트 수완ㅈ",
    "롯데마트 수완저",
    "롯데마트 수완점",
    "롯데마트 수완점",
    "롯데마트 수완점",
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate("/destinationsinfo", { state: { searchTerm } });
  };

  const handleSpecialInput = () => {
    setSearchTerm(inputs[inputStage]);
    setInputStage((prevStage) => (prevStage + 1) % inputs.length);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="명칭, 주소, 설정, 연락처, 미디어를 검색합니다."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ color: inputs.includes(searchTerm) ? "#FFFFFF" : "" }}
        />
        <button type="submit">
          <img
            src="../assets/search.png"
            alt="search"
            style={{ width: "40px" }}
          />
        </button>
      </form>

      <button
        type="button"
        onClick={handleSpecialInput}
        style={{ backgroundColor: "#373636", border: "none" }}
      >
        <img src="../assets/Keyborad.png" alt="keyboard" />
      </button>
    </div>
  );
};

export default DestinationSearch;
