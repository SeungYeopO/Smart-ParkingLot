import React from 'react';
// 관리자페이지에서 주차 구역 클릭하면 가능/불가능 바뀌게 하는거
// 확인하는 모달

const PossiblePlaceModal = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;
    return (
      <div style={{ position: 'fixed', top: '19%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
        <div style={{ backgroundColor: 'rgba(234, 238, 248, 0.7)', padding: '20px', borderRadius: '8px', width: '400px', maxHeight: '80vh', overflowY: 'auto', color : 'black' }}>
          {children}   
        </div>
      </div>
    );
};

export default PossiblePlaceModal;