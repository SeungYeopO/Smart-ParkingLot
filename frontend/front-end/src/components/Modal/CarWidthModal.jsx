import React from 'react';

const CarWidthModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'darkgray', padding: '20px', borderRadius: '5px', width: '500px', maxHeight: '80vh', overflowY: 'auto' }}>
        {children}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default CarWidthModal;
