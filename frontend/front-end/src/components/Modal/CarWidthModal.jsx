import React from 'react';
// 우리 주차장의 칸 너비가 넓은 편이다 좁은 편이다를 나타내는 프리셋
// 좁다 -> suv 같은 큰 차는 경차 옆으로 우선 배치해준다는걸 알려주는 모달

const CarWidthModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'darkgray', padding: '20px', borderRadius: '5px', width: '500px', maxHeight: '80vh', overflowY: 'auto' }}>
        {children}   
      </div>
    </div>
  );
};

export default CarWidthModal;
