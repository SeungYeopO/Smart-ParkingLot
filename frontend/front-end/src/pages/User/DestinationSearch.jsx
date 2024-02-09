import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DestinationSearch = () => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [inputStage, setInputStage] = useState(0); // 입력 단계를 관리하는 상태
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate("/searchmap", { state: { searchTerm } });
  };

  const handleSpecialInput = () => {
    // 입력 단계에 따라 다른 텍스트를 설정
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
    setSearchTerm(inputs[inputStage]);

    // 다음 입력 단계로 이동하거나 초기화
    setInputStage((prevStage) => (prevStage + 1) % inputs.length);
  };

  return (
    <div className="search-container">
      <h2>목적지 검색</h2> <br/>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="목적지를 입력하세요"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">
        <img src="../assets/search.png" alt="search" style={{ width: "30px" }} />
        </button>
      </form>
      <div className="keyborad" >
      <button type="button" onClick={handleSpecialInput} style={{backgroundColor: "#373636", border: "none", marginTop: "20px"}}>
        <img src="../assets/Keyborad.jpeg" alt="keyboard" />
      </button>
      </div>
    </div>
  );
};

export default DestinationSearch;
