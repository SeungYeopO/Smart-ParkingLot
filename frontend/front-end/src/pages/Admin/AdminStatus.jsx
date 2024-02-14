import React, { useState, useEffect } from 'react';
import AdminSideNavbar from '../../components/AdminSideNavbar';
import AdminUpNavbar from '../../components/AdminUpNavbar';
import AdminParkingLot from './../../components/AdminParkingLot';
import StatusInfoModal from './../../components/Modal/StatusInfoModal';

const AdminStatus = () => {
  const [floorId, setFloorId] = useState('1');
  const [parkingStatus, setParkingStatus] = useState([]);
  const [filledlots, setFilledlots] = useState(0);
  const [managedLots, setManagedLots] = useState(0);
  const [showModal, setShowModal] = useState(false);
  

  const destinationMapStyle = {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    marginLeft: '30px'
  };


  const fetchParkingStatus = async () => {
    try {
      const response = await fetch("https://i10c102.p.ssafy.io:3001/api/p_manager/section_stats/1/-1");
      const data = await response.json();
      console.log("전체 주차장 상태 데이터:", data);
      setParkingStatus(data);

      // data_id와 클릭된 lotnum을 기반으로 상태 업데이트
      // 누적값, 현재값이 변수
    }
     catch (error) {
      console.error("주차 상태를 가져오는 중 오류 발생:", error);
    }
  };

  const showInfoModal = () => {
    setShowModal(true);
  }

  useEffect(() => {
    fetchParkingStatus(); // 컴포넌트 마운트 시 주차장 상태 데이터를 가져옴 => 훅
  }, []);

  useEffect(() => {
    const filledCount = parkingStatus.reduce((acc, curr) => acc + (curr.is_filled === 1 ? 1 : 0), 0);
    const managedFilledCount = parkingStatus.reduce((acc, curr) => acc + (curr.is_managed === 1 && curr.is_filled === 0 ? 1 : 0), 0);
    setFilledlots(filledCount); // 계산된 값을 filledSlots 상태에 저장
    setManagedLots(managedFilledCount);
  }, [parkingStatus]);

// === 실시간 통신이 아니기 때문에 실시간 데이터 반영을 위해서 주기적으로 요청

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchParkingStatus(); // 주기적으로 실행할 함수
    }, 500); // 5000ms = 5초마다 실행
  
    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);
  

  const handleFloorChange = (event) => {
    const selectedValue = event.target.value;
    console.log(`Selected floor: ${selectedValue}`); // 콘솔에 선택된 층의 값을 출력
    setFloorId(selectedValue); // 상태를 업데이트
  };

  return (
    <div>
      <AdminUpNavbar />
      <div style={{ display: 'flex' }}>
        <div>
          <AdminSideNavbar />
        </div>
        <div>
          <div>
            <div style={{display : 'flex'}} className='func-name'>
              <p>Status</p>
              <img onClick={showInfoModal} style={{ width : '20px', height : '20px', marginLeft : '5px'}} src="/assets/info.png" alt="infoemozi" />
            </div>
            <div className='floor-status' style={{ display: 'flex' }}>
              <div>
                <select
                  className="floor-select-box"
                  onChange={handleFloorChange}
                >
                  <option value="1">B1</option>
                  <option value="2">B2</option>
                </select>
              </div>
              <div className="status-box">
                <img src="/assets/checkgreen.png" alt="checkimg" />
                <p style={{ display: 'inline-block', marginLeft: '20px', marginTop: '20px', fontSize: 'large' }}> {filledlots} / 83</p>
              </div>
            <div className='status-notify' style={{paddingLeft : '10px', paddingTop : '1px'}}>
              <img src="/assets/notification.png" alt="알림img" />
              <p style={{ display: 'inline-block', fontSize: 'medium' }}>
                {`관리자에 의해 ${managedLots}개의 자리가 주차불가구역으로 설정되었습니다`}
              </p>
            </div>
            </div>
            <div style={destinationMapStyle}>
              <AdminParkingLot showModal={true}/>
            </div>
          </div>
        </div>
      </div>
      <StatusInfoModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <p> 현재 주차된 차량의 대수 / 전체 주차장 자리 수를 확인하실 수 있습니다</p>
        <p> 현재 주차된 차량 : 빨간색</p>
        <p> 관리자에 의해 주차 불가구역으로 설정된 자리 : 파란색</p>
        <p> 빈 자리 : 초록색 </p>
    
      </StatusInfoModal>
    </div>
  );
};

export default AdminStatus;
