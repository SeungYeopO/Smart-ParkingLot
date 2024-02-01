import React, { useEffect, useState } from "react";

import parkingData from "../../components/test.json";

const AdminMap = () => {
  const [parkingStatus, setParkingStatus] = useState({});

  useEffect(() => {
    // JSON 파일에서 section_id와 is_filled 값을 추출하여 상태로 설정합니다.
    const statusMap = {};
    parkingData.forEach((item) => {
      statusMap[item.section_id] = item.is_filled;
    });
    setParkingStatus(statusMap);
  }, []);

  const parkingSpaces = [
    { id: 1, x: 137, y: 77, width: 67, height: 30 },
    { id: 2, x: 137, y: 109, width: 67, height: 30 },
    { id: 3, x: 137, y: 141, width: 67, height: 30 },
    { id: 4, x: 137, y: 211, width: 67, height: 30 },
    { id: 5, x: 137, y: 243, width: 67, height: 30 },
    { id: 6, x: 137, y: 275, width: 67, height: 30 },
    { id: 7, x: 221, y: 361, width: 67, height: 30 },
    { id: 8, x: 221, y: 393, width: 67, height: 30 },
    { id: 9, x: 221, y: 425, width: 67, height: 30 },
    { id: 10, x: 221, y: 481, width: 67, height: 30 },
    { id: 11, x: 221, y: 513, width: 67, height: 30 },
    { id: 12, x: 221, y: 567, width: 67, height: 30 },
    { id: 13, x: 221, y: 599, width: 67, height: 30 },
    { id: 14, x: 221, y: 631, width: 67, height: 30 },
    { id: 15, x: 221, y: 685, width: 67, height: 30 },
    { id: 16, x: 312, y: 90, width: 45, height: 26 },
    { id: 17, x: 322, y: 130, width: 30, height: 67 },
    { id: 18, x: 354, y: 130, width: 30, height: 67 },
    { id: 19, x: 386, y: 130, width: 30, height: 67 },
    { id: 20, x: 444, y: 130, width: 30, height: 67 },
    { id: 21, x: 476, y: 130, width: 30, height: 67 },
    { id: 22, x: 526, y: 130, width: 30, height: 67 },
    { id: 23, x: 558, y: 130, width: 30, height: 67 },
    { id: 24, x: 656, y: 130, width: 30, height: 67 },
    { id: 25, x: 688, y: 130, width: 30, height: 67 },
    { id: 26, x: 720, y: 130, width: 30, height: 67 },
    { id: 27, x: 777, y: 130, width: 30, height: 67 },
    { id: 28, x: 809, y: 130, width: 30, height: 67 },
    { id: 29, x: 867, y: 130, width: 30, height: 67 },
    { id: 30, x: 899, y: 130, width: 30, height: 67 },
    { id: 31, x: 931, y: 130, width: 30, height: 67 },
    { id: 32, x: 973, y: 130, width: 30, height: 67 },
    { id: 33, x: 1060, y: 130, width: 30, height: 67 },
    { id: 34, x: 1102, y: 130, width: 50, height: 67 },
    { id: 35, x: 1154, y: 130, width: 30, height: 67 },
    { id: 36, x: 1196, y: 130, width: 30, height: 67 },
    { id: 37, x: 1225, y: 204, width: 67, height: 30 },
    { id: 38, x: 1225, y: 236, width: 67, height: 30 },
    { id: 39, x: 1247, y: 268, width: 45, height: 26 },
    { id: 40, x: 462, y: 325, width: 67, height: 30 },
    { id: 41, x: 427, y: 358, width: 67, height: 30 },
    { id: 42, x: 427, y: 390, width: 67, height: 30 },
    { id: 43, x: 427, y: 422, width: 67, height: 30 },
    { id: 44, x: 496, y: 358, width: 67, height: 30 },
    { id: 45, x: 496, y: 390, width: 67, height: 30 },
    { id: 46, x: 496, y: 422, width: 67, height: 30 },
    { id: 47, x: 427, y: 487, width: 67, height: 30 },
    { id: 48, x: 427, y: 518, width: 67, height: 30 },
    { id: 49, x: 427, y: 551, width: 67, height: 30 },
    { id: 50, x: 427, y: 583, width: 67, height: 30 },
    { id: 51, x: 496, y: 487, width: 67, height: 30 },
    { id: 52, x: 496, y: 518, width: 67, height: 30 },
    { id: 53, x: 496, y: 551, width: 67, height: 30 },
    { id: 54, x: 496, y: 583, width: 67, height: 30 },
    { id: 55, x: 716, y: 325, width: 67, height: 30 },
    { id: 56, x: 680, y: 358, width: 67, height: 30 },
    { id: 57, x: 680, y: 390, width: 67, height: 30 },
    { id: 58, x: 680, y: 422, width: 67, height: 30 },
    { id: 59, x: 750, y: 358, width: 67, height: 30 },
    { id: 60, x: 750, y: 390, width: 67, height: 30 },
    { id: 61, x: 750, y: 422, width: 67, height: 30 },
    { id: 62, x: 680, y: 487, width: 67, height: 30 },
    { id: 63, x: 680, y: 518, width: 67, height: 30 },
    { id: 64, x: 680, y: 551, width: 67, height: 30 },
    { id: 65, x: 680, y: 583, width: 67, height: 30 },
    { id: 66, x: 750, y: 487, width: 67, height: 30 },
    { id: 67, x: 750, y: 518, width: 67, height: 30 },
    { id: 68, x: 750, y: 551, width: 67, height: 30 },
    { id: 69, x: 750, y: 583, width: 67, height: 30 },
    { id: 70, x: 947, y: 310, width: 30, height: 67 },
    { id: 71, x: 947, y: 376, width: 30, height: 67 },
    { id: 72, x: 979, y: 310, width: 30, height: 67 },
    { id: 73, x: 979, y: 376, width: 30, height: 67 },
    { id: 74, x: 1011, y: 310, width: 30, height: 67 },
    { id: 75, x: 1011, y: 376, width: 30, height: 67 },
    { id: 76, x: 1043, y: 310, width: 26, height: 45 },
    { id: 77, x: 1095, y: 310, width: 30, height: 67 },
    { id: 78, x: 1127, y: 310, width: 30, height: 67 },
    { id: 79, x: 1197, y: 310, width: 26, height: 45 },
    { id: 80, x: 1098, y: 410, width: 26, height: 45, rotate: 45 },
    { id: 81, x: 1121, y: 430, width: 26, height: 45, rotate: 45 },
    { id: 82, x: 940, y: 580, width: 30, height: 67 },
    { id: 83, x: 972, y: 580, width: 26, height: 45 },
  ];

  return (
    <div className="parking-lot">
      {parkingSpaces.map((space) => (
        <div
          key={space.id}
          className="parking-space"
          style={{
            position: "absolute",
            left: `${space.x}px`,
            top: `${space.y}px`,
            width: `${space.width}px`,
            height: `${space.height}px`,
            rotate: `${space.rotate}deg`,
            backgroundColor:
              parkingStatus[space.id] === 1 ? "rgb(2, 24, 45)" : "#66e166",
          }}
        >
          <span style={{ color: "rgb(2, 24, 45)" }}>{space.id}</span>
          
        </div>
      ))}
    </div>
  );
};
export default AdminMap;
