import React, { useState } from 'react';
import styled from 'styled-components';
import QUERY from '../constants/query';
import useGetQuery from '../hooks/useGetQuery';
import ROUTER from '../constants/router';

export default function MyPage() {
  const [userInfo, setUserInfo] = useState({});

// 프로필 컴포넌트
const Profile = () => (
  <ProfileContainer>
    <ProfileImage src="/profile.jpg" alt="프로필 이미지" />
    <div>
      <div>
        <NickName>사용자 닉네임</NickName>
        {/* <p>평점: 4.5</p> */}
      </div>
    </div>
    <ProfileButton>프로필 편집</ProfileButton>
  </ProfileContainer>
);

  // 당근, 번개페이, 잔액 정보
  const AdditionalInfo = () => (
    <AdditionalInfoContainer>
      <p>당근번개 페이 잔액: 100,000원</p>
      <ButtonContainer>
        <Button>충전</Button>
        <Button>환전</Button>
      </ButtonContainer>
    </AdditionalInfoContainer>
  );

  
  // 관심 목록 및 거래 후기
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

  // 팔로우 관리 및 알림 설정
  const FollowAndNotifications = () => (
    <FollowAndNotificationsContainer>
    <div>
      <h3>기타</h3>
      <h3><ThinText>팔로우 관리</ThinText></h3>
      <h3><ThinText>알림 설정</ThinText></h3>
    </div>
    </FollowAndNotificationsContainer>
  );

  return (
    <MyPageContainer>
      <div style={{ marginTop: '50px' }}>
        <Profile />
        <AdditionalInfo />
        <hr style={{ width: '70%', height: '2px', backgroundColor: 'black', margin: '20px auto' }} />
        <InterestAndReviews />
        <hr style={{ width: '70%', height: '2px', backgroundColor: 'black', margin: '20px auto' }} />
        <FollowAndNotifications />
      </div>
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