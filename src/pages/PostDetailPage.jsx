import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Storage from '../utils/localStorage';
import ROUTER from '../constants/router';
import ImageSlider from '../components/ImageSlider';
import QUERY from '../constants/query';

export default function PostDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPostDetails() {
      try {
        const response = await axios.get(`${QUERY.AXIOS_PATH.SEVER}/api/posts/${postId}`);
        console.log(response.data.result);
        setPost(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post details:', error);
        setLoading(false);
      }
    }

    fetchPostDetails();
  }, [postId]);

  const handleChatButtonClick = async () => {
    try {
      const currentUserId = Storage.getUserId();
      console.log("게시글 작성자 ID:", post.userid);
      const response = await axios.get(`http://localhost:8888/api/chatting/createOrGetChatRoom`, {
        params: {
          sellerId: post.userid,
          currentUserId: currentUserId,
          postId: post.postid
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

  const currentUserId = Storage.getUserId();
  console.log("Current User ID:", currentUserId);
  console.log("Post User ID2:", post.userid);

  return (
    <MainWrapper>
      <DetailWrapper>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ImageContainer>
              <ImageSlider images={post.attachedFilesPaths} />
            </ImageContainer>
            <PostInfoContainer>
              <h1>{post.title}</h1>
              <CardText>Price: {post.price}</CardText>
              <CardText>Address: {post.address}</CardText>
              <CardDescription>{post.content}</CardDescription>
              {Number(post.userid) !== Number(currentUserId) && (
                <ChatButton onClick={handleChatButtonClick}>캐럿톡</ChatButton>
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

const CardText = styled.p`
  font-size: 18px;
  margin-bottom: 5px;
`;

const CardDescription = styled.p`
  font-size: 16px;
  margin: 10px 0;
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
