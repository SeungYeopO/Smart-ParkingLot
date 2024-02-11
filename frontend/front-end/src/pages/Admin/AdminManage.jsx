// 나중엔 지울 페이지인데 여기에다가 맵 띄우는거 테스트 하는 중이예요


import React from 'react';
import CarWidthModal from './../../components/Modal/CarWidthModal';
import { useState } from 'react';
import MapTest from './../../components/MapTest';
import OriginalParkingLot from './../../components/OrginalParkingLot';
const AdminManage = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
  
    return (
      <div>
        <OriginalParkingLot />
        <MapTest />
        <button onClick={openModal}>자동차 너비 모달 열기</button>
        <CarWidthModal isOpen={modalOpen} onClose={closeModal}>
          <p>자동차 너비 정보를 여기에 표시합니다.</p>
        </CarWidthModal>
      </div>
    );
};

export default AdminManage