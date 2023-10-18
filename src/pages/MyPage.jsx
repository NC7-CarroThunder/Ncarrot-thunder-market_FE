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
  const [tab, setTab] = React.useState('posts');


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

  const getNickname = () => {
    return Storage.getNickName();
  }
  const getPoint = () => {
    return `당근번개 페이 잔액:${Storage.getPoint()}원`
  }

  const posts = [
    { title: '게시글1', price: '5,000원', image: '1.jpg' },
    { title: '게시글2', price: '15,000원', image: '9.jpg' },
    { title: '게시글3', price: '25,000원', image: '3.jpg' },
  ];
  
  const ongoing = [
    { title: '거래중1', price: '12,000원', image: '2.jpg' },
    { title: '거래중2', price: '22,000원', image: '3.jpg' },
    { title: '거래중3', price: '32,000원', image: '4.jpg' },
  ];
  
  const wishlists = [
    { title: '아이템1', price: '10,000원', image: '4.jpg' },
    { title: '아이템2', price: '20,000원', image: '1.jpg' },
    { title: '아이템3', price: '30,000원', image: '2.jpg' },
  ];

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

  const Profile = ({ onProfileEditClick }) => (
    <ProfileContainer>
      {(Storage.getPhoto() == undefined) ? (
        <ProfileImage src="/profile.jpg" alt="프로필 이미지" />
      ) : (
        <ProfileImage src={`https://kr.object.ncloudstorage.com/carrot-thunder/user/${Storage.getPhoto()}`} alt="프로필 이미지" />
      )}
      <ProfileInfoContainer>
      <div>
        <NickName>{getNickname()}</NickName>
      </div>
      <ProfileButton onClick={onProfileEditClick}>프로필 편집</ProfileButton>
      <ChatButton onClick={handleChatButtonClick}>캐럿톡</ChatButton>
      </ProfileInfoContainer>
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

  return (
    <MyPageContainer>
      <ContentContainer>
        <ProfileAndAdditionalInfoContainer>
          <Profile onProfileEditClick={handleProfileEditClick} />
          <AdditionalInfo />
        </ProfileAndAdditionalInfoContainer>
        <Separator />
  
        {isModalOpen && (
          <div style={modalOverlayStyle}>
            <div style={modalStyle}>
              <span style={closeBtnStyle} onClick={closeModal}>&times;</span>
              <h2 style={{textAlign: 'center'}}>충전</h2>
              <form>
              <Separator />
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
  
        <TabContainer>
          <TabButton onClick={() => setTab('posts')} active={tab === 'posts'}>내 게시글</TabButton>
          <TabButton onClick={() => setTab('ongoing')} active={tab === 'ongoing'}>거래중</TabButton>
          <TabButton onClick={() => setTab('wishlist')} active={tab === 'wishlist'}>찜</TabButton>
          <TabButton onClick={() => setTab('reviews')} active={tab === 'reviews'}>거래후기</TabButton>
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
            : tab === 'followers' 
            ? followers.map(user => (
                <UserCard key={user.name}>
                  <UserImage background={user.image} />
                  {user.name}
                  <FollowButton>팔로우</FollowButton>
                </UserCard>
              ))
              : tab === 'wishlist'
              ? wishlists.map(item => (
                  <ListCard key={item.title}>
                    <ListImage background={item.image} />
                    <div>{item.title}</div>
                    <div>{item.price}</div>
                  </ListCard>
                ))
              : tab === 'posts'
              ? posts.map(item => (
                  <ListCard key={item.title}>
                    <ListImage background={item.image} />
                    <div>{item.title}</div>
                    <div>{item.price}</div>
                  </ListCard>
                ))
              : tab === 'ongoing'
              ? ongoing.map(item => (
                  <ListCard key={item.title}>
                    <ListImage background={item.image} />
                    <div>{item.title}</div>
                    <div>{item.price}</div>
                  </ListCard>
                ))
                : null
              }
            </ListContainer>
      </ContentContainer>
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
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

const NickName = styled.h2`
  margin-top: 15px; 
`;

const ProfileButton = styled.button`
  width: 100px;
  height: 30px;
  background-color: #ff922b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const AdditionalInfoContainer = styled.div`
  width: 40%;
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

const ChatButton = styled.button`
    width: 100px;
    height: 30px;
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
`;

const ProfileAndAdditionalInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-left: 350px;
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
  width: '500px',     // 너비 추가
  height: '300px',    // 높이 추가
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
  background: '#ff922b',
  color: 'white',
  padding: '10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};
// 여기까지

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;
  justify-content: center;
`;

const TabButton = styled.button`
  width: 170px;
  padding: 10px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#ddd' : 'transparent')};
  border: none;
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-left: 230px;
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

const ListCard = styled.div`
  width: 200px; 
  height: 200px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ListImage = styled.div`
  width: 150px;
  height: 150px;
  background-color: #eee;
  background-image: url(${props => props.background ? `${process.env.PUBLIC_URL}/${props.background}` : ''});
  background-size: cover;
  margin-bottom: 10px; 
`;
