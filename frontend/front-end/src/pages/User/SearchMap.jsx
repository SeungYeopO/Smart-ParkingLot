import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchMap = () => {
  const [showMessage, setShowMessage] = useState(false); // 안내 메시지 표시 여부를 관리하는 상태
  const navigate = useNavigate();

  const handleClick = () => {
    setShowMessage(true); // 안내 메시지 표시

    // 2초 후에 안내 메시지를 숨기고 '/destinationmap'으로 이동
    setTimeout(() => {
      setShowMessage(false); // 안내 메시지 숨기기
      navigate('/destinationmap'); // '/destinationmap'으로 이동
    }, 2000);
  };

  return (
    <div className='searchMap'>
      <div className='logo-search'></div>
      <div className='balloonStatus1' onClick={handleClick}>
        <div className='balloonContent'>주차 가능: 45대</div>
      </div>
      <div className='balloonStatus2' onClick={handleClick}>
        <div className='balloonContent'>주차 가능: 36대</div>
      </div>
      <div className='balloonStatus3' onClick={handleClick}>
        <div className='balloonContent'>주차 가능: 42대</div>
      </div>

      {/* 안내 메시지 */}
      {showMessage && (
        <div className="message-container">
          <div className="message">
            <p>선택하신 주차장으로 안내를 시작합니다.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchMap;
