import React, { useState } from 'react';
import styled from 'styled-components';
import QUERY from '../constants/query';
import useGetQuery from '../hooks/useGetQuery';
import ROUTER from '../constants/router';


export default function MyPage() {
  const [userInfo, setUserInfo] = useState({});

  const Profile = () => (
    <ProfileContainer>
      <ProfileImage src="/path/to/profile-image.jpg" alt="프로필 이미지" />
      <h2>사용자 닉네임</h2>
      {/* <p>평점: 4.5</p> */}
    </ProfileContainer>
  );

  const ProfileButton = () => (
    <EditProfileButton>프로필 편집</EditProfileButton>
  );

  const AdditionalInfo = () => (
    <AdditionalInfoContainer>
      <p>당근번캐 페이 잔액: 100,000원</p>
    </AdditionalInfoContainer>
  );

  const InterestAndReviews = () => (
    <InterestAndReviewsContainer>
      <SectionTitle>내 게시글</SectionTitle>
      <SectionTitle>관심 목록</SectionTitle>
      <SectionTitle>거래 후기</SectionTitle>
    </InterestAndReviewsContainer>
  );

  const FollowAndNotifications = () => (
    <FollowAndNotificationsContainer>
      <SectionTitle>팔로우 관리</SectionTitle>
      <SectionTitle>알림 설정</SectionTitle>
    </FollowAndNotificationsContainer>
  );

  return (
    <MyPageContainer>
      <Profile />
      <AdditionalInfo />
      <ProfileButton />
      <InterestAndReviews />
      <FollowAndNotifications />
    </MyPageContainer>
  );
};

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7f7f7;
  font-family: 'Nanum Gothic', sans-serif;
  padding: 20px;
`;

const ProfileContainer = styled.div`
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const EditProfileButton = styled.button`
  background-color: #007BFF;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
`;

const AdditionalInfoContainer = styled.div`
  margin-top: 20px;
`;

const InterestAndReviewsContainer = styled.div`
  margin-top: 20px;
`;

const FollowAndNotificationsContainer = styled.div`
  margin-top: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  margin: 10px 0;
`;

const Profile = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%; /* 이미지를 원형으로 만듭니다. */
  margin-bottom: 10px;
`;