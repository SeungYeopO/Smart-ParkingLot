import React from 'react';
import { useNavigate } from 'react-router-dom';

const DestinationInfo = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/searchmap');
  };

  return (
    <div>
      <div className='destination-info'>
        <button onClick={handleButtonClick}></button>
      </div>
    </div>
  );
};

export default DestinationInfo;
