import React from 'react';
import { useState, useEffect } from 'react';

const MyCar = () => {
  const [nowPosition, setNowPosition] = useState([]);
  const [PositionIndex, setPositionIndex] = useState(0);

  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/assets/data.json');
      const data = await response.json();
      setNowPosition(data); 
    };

    fetchData();
  
  }, [] );

  const goToNextPosition = (e) => {
    setPositionIndex((preIndex) => 
      preIndex < nowPosition.length -1 ? preIndex + 1 : preIndex
    );
    console.log(e)
  };

  const positionDotStyle = {
    left : `${nowPosition[PositionIndex]?.x }px`,
    top : `${nowPosition[PositionIndex]?.y }px`,
  };

  return (
    <div>
      <div className="position-dot" style={positionDotStyle}></div>
      <p>현재 좌표: {nowPosition[PositionIndex]?.x}, {nowPosition[PositionIndex]?.y}</p>
      <button onClick={goToNextPosition}>Next Position</button>
    </div>
  );
};


export default MyCar;