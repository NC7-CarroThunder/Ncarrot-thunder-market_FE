import React, { useState } from 'react';
import styled from 'styled-components';

export default function FollowList() {
  const [tab, setTab] = useState('following');

  const followers = [
    { name: '사용자1', image: 'dog.jpg' },
    { name: '사용자2', image: 'rabbit.jpg' },
    { name: '사용자3', image: '9.jpg' }
  ];

  const followings = [
    { name: '사용자4', image: '1.jpg' },
    { name: '사용자5', image: '2.jpg' },
    { name: '사용자6', image: '3.jpg' }
  ];

  return (
    <FollowListContainer>
      <FollowTitle>팔로우관리</FollowTitle>
      <TabContainer>
        <TabButton onClick={() => setTab('following')} active={tab === 'following'}>팔로잉</TabButton>
        <TabButton onClick={() => setTab('followers')} active={tab === 'followers'}>팔로워</TabButton>
      </TabContainer>
      <ListContainer>
        {tab === 'following' 
          ? followings.map(user => (
              <UserCard key={user.name}>
                <UserImage background={user.image} />
                {user.name}
                <FollowButton>팔로잉</FollowButton>
              </UserCard>
            ))
          : followers.map(user => (
              <UserCard key={user.name}>
                <UserImage background={user.image} />
                {user.name}
                <FollowButton>팔로우</FollowButton>
              </UserCard>
            ))
        }
      </ListContainer>
    </FollowListContainer>
  );
}

const FollowListContainer = styled.div`
width: 100%;
height: 100%;
overflow-y: auto;
overflow-x: hidden;
background-color: #f7f7f7;
display: flex;
flex-direction: column;
padding-top: 50px;
`;

const FollowTitle = styled.h1`
  margin-bottom: 30px;
  margin-left: 250px;
  font-size: 24px;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;
  justify-content: center;
`;

const TabButton = styled.button`
  width: 500px;
  padding: 10px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#ddd' : 'transparent')};
  border: none;
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-left: 300px;
`;

const UserCard = styled.div`
  width: 100px; 
  height: 140px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`;

const UserImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #eee;
  background-image: url(${props => props.background ? `${process.env.PUBLIC_URL}/${props.background}` : ''});
  background-size: cover;
  margin-bottom: 10px; 
`;

const FollowButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #ff922b;
  color: white;
  cursor: pointer;
`;



