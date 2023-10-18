import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from '../utils/api/axios';
import QUERY from '../constants/query';
import styled from 'styled-components';
import MyImageSlider from '../components/ImageSlider';
import ChatRoom from './ChatRoom'; 

const axios = new Axios(QUERY.AXIOS_PATH.SEVER);

export default function PurchasePage() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPostDetails() {
      try {
        const apiUrl = `${QUERY.AXIOS_PATH.POSTDETAIL.replace(':postId', postId)}`;
        const response = await axios.get(apiUrl);
        setPost(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post details:', error);
        setLoading(false);
      }
    }

    fetchPostDetails();
  }, [postId]);

  const formatPrice = (price) => {
    return price.toLocaleString('en-US');
  };


  return (
    <MainWrapper>
      <DetailWrapper>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ImageContainer>
              
              {/* <CustomImageSlider> */}
                <MyImageSlider images={post.attachedFilesPaths} />
              {/* </CustomImageSlider> */}
            </ImageContainer>
            <ContentContainer>
            <h1>{post.title}</h1>
              <CardText>
                <strong>{formatPrice(post.price)}원</strong>
              </CardText>
              {/* 가운데에 내용을 추가합니다. */}
              <CardDescription>{post.content}</CardDescription>
              내 포인트 : 40000
              <CreditButton>충전하기</CreditButton>
              <BuyButton>구매버튼</BuyButton>
            </ContentContainer>
            <ChatRoomContainer>
              {/* 오른쪽에 채팅방을 추가합니다. */}
              <ChatRoom roomId={postId} />
            </ChatRoomContainer>
          </>
        )}
      </DetailWrapper>
    </MainWrapper>
  );
}

const MainWrapper = styled.main`
  display: flex;
  width: 100%;
  height: 90%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f7f7f7;
  align-items: center;
  margin: 0 auto;
`;

const DetailWrapper = styled.div`
  display: flex;
  max-width: 1440px;
  height: 100%;
  width: 100%;
  margin: 30px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  flex: 1;
  padding: 20px;
  position: relative;
`;
// const MyImageSlider = styled.img`
//   max-width: 200px; /* 최대 가로 크기 200px */
//   max-height: 200px; /* 최대 세로 크기 200px */
//   object-fit: contain;
// `;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const CardText = styled.p`
  font-size: 18px;
  margin-bottom: 5px;
`;

const CardDescription = styled.p`
  font-size: 16px;
  margin: 10px 0;
  line-height: 1.5;
`;

const ChatRoomContainer = styled.div`
  flex: none;
  width: 25vw;
  height: 50vh;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  border-left: 1px solid #c0c0c0;
  overflow-y: hidden;
  border-radius: 5px;
  border: 1px solid rgba(128, 128, 128, 0.2); // 연한 회색 테두리 추가
`;


const BuyButton = styled.button`
  width: 7rem;
  font-size: 13px;
  padding: 10px;
  background-color: #ff922b;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: 'Noto Sans KR', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 10px 0;
  &:hover {
    background-color: #ffad6d;
  }
`;

const CreditButton = styled.button`
  width: 7rem;
  font-size: 13px;
  padding: 10px;
  background-color: #ff922b;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: 'Noto Sans KR', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 10px 0;
  &:hover {
    background-color: #ffad6d;
  }
`;
