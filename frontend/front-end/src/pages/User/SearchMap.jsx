import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchMap = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/destinationmap')
  }

  return (
    <div className='searchMap'>
      <div className='logo-search'>
      <img src="../assets/logo.png" alt="logo" />
      </div>
      <div className='balloonStatus1' onClick={handleClick}>
        <div className='balloonContent'>
          주차 가능: 78대
        </div>
      </div>
      <div className='balloonStatus2' onClick={handleClick}>
        <div className='balloonContent'>
          주차 가능: 133대
        </div>
      </div>
      <div className='balloonStatus3' onClick={handleClick}>
        <div className='balloonContent'>
          주차 가능: 13대
        </div>
      </div>
      <div className='balloonStatus4' onClick={handleClick}>
        <div className='balloonContent'>
          주차 가능: 15대
        </div>
      </div>
      <div className='balloonStatus5' onClick={handleClick}>
        <div className='balloonContent'>
          주차 가능: 5대
        </div>
      </div>
      <div className='balloonStatus6' onClick={handleClick}>
        <div className='balloonContent'>
          주차 가능: 3대
        </div>
      </div>
      <div className='balloonStatus7' onClick={handleClick}>
        <div className='balloonContent'>
          주차 가능: 4대
        </div>
      </div>
      <div className='balloonStatus8' onClick={handleClick}>
        <div className='balloonContent'>
          주차 가능: 2대
        </div>
      </div>
    </div>
  );
};

export default SearchMap;
