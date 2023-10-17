import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import Storage from '../utils/localStorage';
import ROUTER from '../constants/router';
import ImageSlider from '../components/ImageSlider';
import QUERY from '../constants/query';
import Axios from '../utils/api/axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart as solidHeart} from '@fortawesome/free-solid-svg-icons';
import {faHeart as regularHeart} from '@fortawesome/free-regular-svg-icons';

const axiosForLoginUser = new Axios(QUERY.AXIOS_PATH.SEVER);

export default function PostDetailPage() {
  const {postId} = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    async function fetchPostDetails() {
      try {
        const response = await axios.get(
            `${QUERY.AXIOS_PATH.SEVER}/api/posts/${postId}`);
        console.log(response.data.result);
        setPost(response.data.result);
        setLoading(false);

        const wishlistStatusResponse = await axiosInstance.get(
            `${QUERY.AXIOS_PATH.SEVER}/api/wishlist/status/${postId}`
        );
        setIsLiked(wishlistStatusResponse.data.isLiked);
      } catch (error) {
        console.error('게시물 정보 가져오기 오류:', error);
        setLoading(false);
      }
    }

    fetchPostDetails();
  }, [postId]);

  const handleChatButtonClick = async () => {
    try {
      const currentUserId = Storage.getUserId();
      console.log("게시글 작성자 ID:", post.userid);
      const response = await axios.get(
          `http://localhost:8888/api/chatting/createOrGetChatRoom`, {
            params: {
              sellerId: post.userid,
              currentUserId: currentUserId,
              postId: post.postId
            }
          });

      const roomId = response.data.roomId;
      if (roomId) {
        setTimeout(() => {
          navigate(ROUTER.PATH.CHATTING);
        }, 300);
      } else {
        console.error('채팅방 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error creating or accessing the chat room:', error);
    }
  };

  const axiosInstance = new Axios(QUERY.AXIOS_PATH.SEVER);

  const handleWishlistButtonClick = async () => {
    try {
      const apiUrl = QUERY.AXIOS_PATH.TOGGLE_WISHLIST;
      const response = await axiosInstance.post(apiUrl, {articleId: postId});

      if (response.data.success) {
        setIsLiked(!isLiked);
      } else {
        console.error('위시리스트 설정 실패');
      }
    } catch (error) {
      console.error('위시리스트 설정 오류:', error);
    }
  };

  const currentUserId = Storage.getUserId();
  console.log("현재 사용자 ID:", currentUserId);
  console.log("게시글 작성자 ID:", post.userid);

  const formatPrice = (price) => {
    return price.toLocaleString('en-US');
  };

  return (
      <MainWrapper>
        <DetailWrapper>
          {loading ? (
              <p>로딩 중...</p>
          ) : (
              <>
                <ImageContainer>
                  <ImageSlider images={post.attachedFilesPaths}/>
                </ImageContainer>
                <PostInfoContainer>
                  <h1>{post.title}</h1>
                  <CardText><strong>{formatPrice(
                      post.price)}원</strong></CardText>
                  <ContentContainer>
                    <CardDescription>{post.content}</CardDescription>
                  </ContentContainer>
                  <CardText>거래지역 {post.address}</CardText>
                  <CardText>카테고리 {post.itemCategory}</CardText>
                  {Number(post.userid) !== Number(currentUserId) && (
                      <ButtonWrapper>
                        <LikeButton onClick={handleWishlistButtonClick}
                                    isLiked={isLiked}>
                          <HeartIcon isLiked={isLiked}
                                     icon={isLiked ? solidHeart
                                         : regularHeart}/>
                        </LikeButton>
                        <ChatButton
                            onClick={handleChatButtonClick}>캐럿톡</ChatButton>
                      </ButtonWrapper>
                  )}
                </PostInfoContainer>
              </>
          )}
        </DetailWrapper>
      </MainWrapper>
  );
}

const MainWrapper = styled.main`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const DetailWrapper = styled.div`
  display: flex;
  max-width: 1000px;
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

const PostInfoContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContentContainer = styled.div`
  width: 400px;
  height: 500px;
  overflow: auto;
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

const ChatButton = styled.button`
  padding: 10px 20px;
  background-color: #ff922b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #497da0;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px; /* 원하는 간격으로 조절하세요 */
`;

const LikeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s;

  &:hover {
    color: #ff4d4f;
  }
`;

const HeartIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
  color: ${props => (props.isLiked ? '#ff4d4f' : '#000')};
`;
