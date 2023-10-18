import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Axios from '../utils/api/axios';
import QUERY from '../constants/query';
import ROUTER from '../constants/router';
import styled from 'styled-components';
import ChatRoom from './ChatRoom'; 
import Storage from '../utils/localStorage';

const axios = new Axios(QUERY.AXIOS_PATH.SEVER);

export default function PurchasePage(SellerId) {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentPoint = Storage.getPoint();
  
  
  console.log('로그',SellerId)
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

  async function purchase(id) {
    console.log(post)
    const postId = (post.postId);
    console.log(postId)
    const response = await axios.put(QUERY.AXIOS_PATH.PURCHASE,{
      postId
    });
    console.log(response)
    if (response.status == 200) {
      Storage.setPoint(response.data)
    } else {
     alert("구매실패")
     return 
    }
  }

  async function cancel() {
    const postId = (post.postId);
    const response = await axios.put(QUERY.AXIOS_PATH.CANCEL,{
      postId
    });
    if (response.status == 200) {
      Storage.setPoint(response.data)
    } else {
     alert("취소실패")
     return 
    }
  }


  async function confirmedPurchase() {
    const postId = (post.postId);
    const response = await axios.put(QUERY.AXIOS_PATH.CONFIRMEDPURCHASE,{
      postId
    });
    if (response.status == 200) {
      
    } else {
     alert("취소실패")
     return 
    }
  }



  const formatPrice = (price) => {
    return price.toLocaleString('en-US');
  };
  
  const CreditButtonClick = () => {
    navigate(ROUTER.PATH.MYPAGE);
  };


  const PurchaseBuyClick = () => {
    const price = post.price;
    const myBalance = parseInt(currentPoint, 10); // 현재 포인트를 정수로 변환
    if (myBalance >= price) {
      // console.log('id',id)
      purchase(post.id);
      alert('구매 완료.');
      navigate(ROUTER.PATH.MAIN);
    } else {
      alert('포인트가 부족합니다.');
    }
  };

  const CancelBuyClick = () => {
      cancel();
      alert('구매 취소');
      navigate(ROUTER.PATH.MAIN);
  };

  const ComfirmedPurchaseBuyClick = () => {
      confirmedPurchase();
      alert('구매 확정');
      navigate(ROUTER.PATH.MAIN);
  };

  return (
    <MainWrapper>
      <DetailWrapper>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
          <Card>
            <PostContainer>
            <Link to={ROUTER.PATH.POSTDETAIL}>
                    <CardImg
                      src={`http://xflopvzfwqjk19996213.cdn.ntruss.com/article/${post.attachedFilesPaths[0].filePath}?type=f&w=250&h=250`}
                      alt={'게시글 이미지'}
                      className="card-img-top"
                    />
                    </Link>
                    <CardBody>
                      <CardTitle>{post.title}</CardTitle>
                      <CardText><strong>{formatPrice(post.price)}원</strong></CardText>
                    </CardBody>
                    </PostContainer>
                    <ContentContainer>
              <CardDescription>{post.content}</CardDescription>
              내 포인트: {currentPoint}
              <CreditButton onClick={CreditButtonClick}>충전하기</CreditButton>
                {(post.itemStatus == "ONGOING" && post.buyerId == Storage.getUserId()) ? (<BuyButton onClick={ComfirmedPurchaseBuyClick}>구매확정</BuyButton>) : (<></>)}
                {(post.itemStatus == "ONGOING" && post.buyerId == Storage.getUserId()) ? (<BuyButton onClick={CancelBuyClick}>구매취소</BuyButton>) : (<></>)}
                {(post.itemStatus == "SELLING") ? (<BuyButton onClick={PurchaseBuyClick}>구매버튼</BuyButton>) : (<></>)}
            </ContentContainer>
                  </Card>
            <ChatRoomContainer>
              <ChatRoom roomId={postId} />
            </ChatRoomContainer>
            
          </>
        )}
      </DetailWrapper>
    </MainWrapper>
  );
}

const MainWrapper = styled.main`
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
  width: 90vw;
  height: 90%;
  margin: 30px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const PostContainer = styled.div`
    display: flex;
`

const Card = styled.div`
  border: 1px solid #ddd;
  margin-bottom: 20px;
  width: 30vw; 
  border-radius: 5%;
  margin-right: 20px;
`;

const CardImg = styled.img`
  margin: 20px;
  width: 10vw;
  border-radius: 5%
`;

const CardBody = styled.div`
  padding: 10px;
`;

const CardTitle = styled.div`
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
`;


const CardText = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;





const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
