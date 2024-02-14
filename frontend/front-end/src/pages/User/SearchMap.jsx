import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PreEnterLotModal from './../../components/Modal/PreEnterLotModal'; // 수정된 컴포넌트 이름

const SearchMap = () => {
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setOpenModal(true); // 안내 메시지 표시

        // 2초 후에 안내 메시지를 숨기고 '/destinationmap'으로 이동
        setTimeout(() => {
            setOpenModal(false); // 안내 메시지 숨기기
            navigate('/destinationmap'); // '/destinationmap'으로 이동
        }, 2000);
    };

    return (
        <div className='searchMap'>
            {/* 기존 코드 생략 */}

            <PreEnterLotModal isOpen={openModal}> {/* 수정된 컴포넌트 사용과 isOpen prop 전달 */}
                <div className="message-container">
                    <div className="message">
                        <p>선택하신 주차장으로 안내를 시작합니다.</p>
                    </div>
                </div>
            </PreEnterLotModal>
        </div>
    );
};

export default SearchMap;
