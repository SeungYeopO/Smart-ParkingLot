import React from 'react';

const StatusInfoModal = ({ isOpen, children, onClose }) => {
    if (!isOpen) return null;

    return (
      <div style={{ position: 'fixed', top: '19%', left: '35%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
        <div style={{ backgroundColor: 'rgba(234, 238, 248, 0.7)', padding: '20px', borderRadius: '8px', width: '500px', height: '230px', overflowY: 'auto', color : 'black' }}>
          {children}
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    );
};

export default StatusInfoModal;
