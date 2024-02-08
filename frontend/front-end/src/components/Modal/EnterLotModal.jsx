import React from 'react';

const EnterLotModal = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: '19%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'rgba(234, 238, 248, 0.7)', padding: '20px', borderRadius: '8px', width: '490px', maxHeight: '80vh', overflowY: 'auto', color : 'black' }}>
        {children}   
      </div>
    </div>
  );
};

export default EnterLotModal;