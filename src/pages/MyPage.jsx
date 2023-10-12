import React, { useState } from 'react';
import styled from 'styled-components';
import QUERY from '../constants/query';
import useGetQuery from '../hooks/useGetQuery';
import ROUTER from '../constants/router';


export default function MyPage() {
  const [userInfo, setUserInfo] = useState({

  });

  // 프로필 컴포넌트
const Profile = () => (
  <div>
    <img src="/path/to/profile-image.jpg" alt="프로필 이미지" />
    <h2>사용자 닉네임</h2>
    <p>평점: 4.5</p>
  </div>
);

// 프로필 관리 버튼
const ProfileButton = () => (
  <button>프로필 편집</button>
);

// 당근, 번개페이, 잔액 정보
const AdditionalInfo = () => (
  <div>
    <p>당근번캐 페이 잔액: 100,000원</p>
  </div>
);



// 관심 목록 및 거래 후기
const InterestAndReviews = () => (
  <div>
    <h3>내 게시글</h3>
    <h3>관심 목록</h3>
    <h3>거래 후기</h3>
  </div>
);

// 팔로우 관리 및 알림 설정
const FollowAndNotifications = () => (
  <div>
    <h3>팔로우 관리</h3>
    <h3>알림 설정</h3>
  </div>
);
  
  return (
    <MyPageContainer>
      {/* {isLoading && <Loading />}
      {isError && <Error />} */}
      <div>
      <Profile />
      <AdditionalInfo />
      <ProfileButton />
      <InterestAndReviews />
      <FollowAndNotifications />
    </div>
      
    </MyPageContainer>
  );
}

const MyPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
  font-family: 'Nanum Gothic', sans-serif;
`;

