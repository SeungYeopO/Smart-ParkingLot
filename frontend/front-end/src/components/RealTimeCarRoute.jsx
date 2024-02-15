import React, { useEffect, useState } from 'react'; 

const RealTimeCarRoute = ({ currentPosition }) => {
  const [rotation, setRotation] = useState(''); 

  useEffect(() => {
    if (!currentPosition) return; 

    const { pos_x, pos_y } = currentPosition;
    const ratio = 1.3;

    // 회전 각도 설정 하기 useEffect 안에 넣어서 쭉 유지되게 만들어야됨
    if (pos_x === '490' && pos_y === '150') {
      setRotation('rotate(-90deg)');
    } else if (pos_x === '328' && pos_y === '150') {
      setRotation('rotate(-180deg)'); 
    }
  }, [currentPosition]); 

  if (!currentPosition) return null; 

  const { pos_x, pos_y } = currentPosition;
  const ratio = 1.3; 

  const carImage = '/assets/arrow.png';

  return (
    <div
      className="real-time-car"
      style={{
        position: 'absolute',
        left: `${pos_x * ratio - 20}px`,
        top: `${pos_y * ratio - 20}px`,
        width: '40px',
        height: '40px',
        backgroundImage: `url(${carImage})`,
        backgroundSize: 'cover',
        transform: rotation,
        transition: 'left 2s, top 1s, transform 2s 0.5s', // transform에도 transition 걸 수 있음 
    
      }}
    ></div>
  );
};

export default RealTimeCarRoute;
