import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  let navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date()); // 현재 시간 상태

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date()); // 1초마다 현재 시간 업데이트
    }, 1000);

    return () => {
      clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
    };
  }, []);

  const gocctvMode = () => {
    navigate('/admincctv');
  };
  const goManageMode = () => {
    navigate('/adminmanage');
  };
  const goStatusMode = () => {
    navigate('/adminstatus');
  };
  const goLogicMode = () => {
    navigate('/adminlogic');
  };

  // 시간을 YYYY.MM.DD HH:mm:ss 형식으로 포맷
  const formatTime = (time) => {
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    return `${year}.${month.toString().padStart(2, '0')}.${date.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  return (
    <div>
      <div className="nav-bar">
        <div className="nav-logo">
          <img src="/assets/car_logo.png" alt="Logo" />
        </div>
        <div className="nav-title-date">
          <p>2024.01.29 11:12:03</p>
        </div>
      <div className="nav-user-info">
        <img src="/assets/usericon.png" alt="User Avatar" className="user-avatar" />
        <span className="user-name">사용자</span>
      </div>
    </div>
    <div className='adminmode-bg'>
    <div className='letter-function'>
      <p>Function</p>
    </div>
    <div className='mode-selection'>
      <div onClick={gocctvMode} className='cctvmode'>
      <p>CCTV 확인</p>
        <img src="/assets/cctvimg.png" alt="cctvImg" />
    </div>
    <div onClick={goStatusMode} className='statusmode'>
        <p>주차현황</p>
        <img src="/assets/Graph.png" alt="status" />
    </div>
    <div onClick={goManageMode} className='managemode'>
        <p>주차관리</p>
        <img src="/assets/settingimg.png" alt="setting" />
    </div>
        <div onClick={goLogicMode} className='logicmode'>
          <p>로직변경</p>
          <img src="/assets/logicimg3.png" alt="logic" />
        </div>
      </div>
      <div className='memo'>
        <p>Today's Issue</p>
      </div>
      <div className='inputMemo'>
          <p className='inputMemo1'> *32번 구역 공사중</p>
          <p className='inputMemo2'> *명절 행사로 인해 추천 우선순위 변경합니다</p>
          <p className='inputMemo3'> 혼잡도를 고려해서 변경해주세요</p>
        </div>
    </div>
    
    
    </div>
    

   
  );
};

const AdminMap = () => {
  return (
    <div>
      <NavBar />
    </div>
  );
};

export default AdminMap;
