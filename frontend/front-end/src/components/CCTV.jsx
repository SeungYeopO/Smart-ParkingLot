import React, { useEffect, useState } from 'react';

const CCTV = () => {
    const [imageSrc, setImageSrc] = useState('');
    const updateInterval = 500; // 이미지를 갱신할 시간 간격, 예: 1000ms = 1초

    async function fetchImageData() {
        try {
          const response = await fetch('http://i10c102.p.ssafy.io:3001/api/p_manager/get_latest_cctv_data');
          const data = await response.json();
          console.log(data)
          if (data.cctv_json) {
              setImageSrc(`data:image/jpeg;base64,${data.cctv_json}`);
          }
        } catch (error) {
          console.error("Error fetching image data:", error);
        }
    }

    useEffect(() => {
        const interval = setInterval(fetchImageData, updateInterval); 

        return () => clearInterval(interval); 
    }, []); // 

    return (
        <div className='cctvImg_screen'>
            {imageSrc && <img src={imageSrc} alt="CCTV" />}
        </div>
    );
};

export default CCTV;
