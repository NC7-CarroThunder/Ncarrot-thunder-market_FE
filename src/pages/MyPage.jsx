import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ROUTER from '../constants/router';
import { useState } from 'react';
import Storage from '../utils/localStorage';

export default function MyPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();


  //결제관련 
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handlePayment = () => {
    // 실제 충전 로직을 처리하는 부분
    if (amount) {
      Storage.setAmount(amount);
      navigate(ROUTER.PATH.PAYMENT)
    } else {
      alert('충전할 금액을 입력해주세요.');
    }
  };

  const handleChatButtonClick = () => {
    navigate(ROUTER.PATH.CHATTING);
  };

  const handleProfileEditClick = () => {
    navigate(ROUTER.PATH.PROFILE_EDIT);
  };

  const handleFollowListClick = () => {
    navigate(ROUTER.PATH.FOLLOW_LIST);
  };
  const getNickname = () => {
    return Storage.getNickName();
  }
  const getPoint = () => {
    return `당근번개 페이 잔액:${Storage.getPoint()}원`
  }

  const Profile = ({ onProfileEditClick }) => (
    <ProfileContainer>
      {(Storage.getPhoto() == undefined) ? (
        <ProfileImage src="/profile.jpg" alt="프로필 이미지" />
      ) : (
        <ProfileImage src={`https://kr.object.ncloudstorage.com/carrot-thunder/user/${Storage.getPhoto()}`} alt="프로필 이미지" />
      )}
      <div>
        <NickName>{getNickname()}</NickName>
      </div>
      <ProfileButton onClick={onProfileEditClick}>프로필 편집</ProfileButton>
    </ProfileContainer>
  );

  const AdditionalInfo = () => (
    <AdditionalInfoContainer>
      <p>{getPoint()}</p>
      <ButtonContainer>
        <Button onClick={openModal}>충전</Button>
        <Button>환전</Button>
      </ButtonContainer>
    </AdditionalInfoContainer>
  );

  const InterestAndReviews = () => (
    <InterestAndReviewsContainer>
      <div>
        <h3>나의 거래</h3>
        <h3><ThinText>내 게시글</ThinText></h3>
        <h3><ThinText>관심 목록</ThinText></h3>
        <h3><ThinText>거래 후기</ThinText></h3>
      </div>
    </InterestAndReviewsContainer>
  );

  const FollowAndNotifications = () => (
    <FollowAndNotificationsContainer>
      <div>
        <h3>기타</h3>
        <h3 onClick={handleFollowListClick}><ThinText>팔로우 관리</ThinText></h3>
        <h3><ThinText>알림 설정</ThinText></h3>
      </div>
    </FollowAndNotificationsContainer>
  );

  return (
    <MyPageContainer>
      <ContentContainer>
        <Profile onProfileEditClick={handleProfileEditClick} />
        <AdditionalInfo />
        <Separator />
        <InterestAndReviews />
        <Separator />
        <FollowAndNotifications />
        <ChatButton onClick={handleChatButtonClick}>캐럿톡</ChatButton>
      </ContentContainer>
      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <span style={closeBtnStyle} onClick={closeModal}>&times;</span>
            <h2>충전 금액 입력</h2>
            <form>
              <label>
                충전 금액:
                <input
                  type="number"
                  placeholder="충전 금액을 입력하세요"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={inputStyle}
                />
              </label>
              <button
                type="button"
                onClick={handlePayment}
                style={buttonStyle}
              >
                충전
              </button>
            </form>
          </div>
        </div>
      )}
    </MyPageContainer>

  );
}

const MyPageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
`;

const ContentContainer = styled.div`
  margin-top: 50px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 250px; 
  gap: 50px;
  margin-bottom: 30px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const NickName = styled.h2`
  margin-top: 15px; 
`;

const ProfileButton = styled.button`
  padding: 5px 10px;
  background-color: #ff922b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const AdditionalInfoContainer = styled.div`
  width: 30%;
  margin-left: 17%;
  background-color: white;
  border: 1px solid #c0c0c0;
  padding: 10px 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column; 
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #ff922b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 30px;
`;

const InterestAndReviewsContainer = styled.div`
margin-left: 250px;
h3 {
  margin-bottom: 20px; 
}
`;

const FollowAndNotificationsContainer = styled.div`
margin-left: 250px;
h3 {
  margin-bottom: 20px; 
}
`;

const ThinText = styled.span`
  font-weight: normal;
`;

const ChatButton = styled.button`
    margin-left: 250px;
    padding: 5px 10px;
    background-color: #ff922b;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
`;

const Separator = styled.hr`
  width: 70%;
  height: 2px;
  background-color: black;
  margin: 20px auto;
`;


/// 모달 관련 css 설정

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const closeBtnStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  fontSize: '20px',
  cursor: 'pointer',
};

const inputStyle = {
  padding: '8px',
  marginTop: '5px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyle = {
  background: '#007BFF',
  color: 'white',
  padding: '10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};
