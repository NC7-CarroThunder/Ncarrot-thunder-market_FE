import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from '../utils/api/axios';
import QUERY from '../constants/query';
import styled from 'styled-components';
import Storage from '../utils/localStorage';
import ROUTER from '../constants/router';

const axios = new Axios(QUERY.AXIOS_PATH.SEVER);


const MyChatRooms = ({ onRoomSelect }) => {
  const navigator = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);
  const [images, setImages] = useState({});
  const userId = Storage.getUserId();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get(`/api/chatting/myChatRooms?userId=${userId}`).catch((error) => {
          if (error.response.status == 401) {
            navigator(ROUTER.PATH.LOGIN)
          }
          console.error('Error fetching old messages:', error);
        });
        setChatRooms(response.data.chatRooms);

        const validChatRooms = response.data.chatRooms.filter(room => room.postId !== 0);

        const imagePromises = validChatRooms.map(room =>
          axios.get(`/api/chatting/getFirstAttachment?postId=${room.postId}`).catch((error) => {
            if (error.response.status == 401) {
              navigator(ROUTER.PATH.LOGIN)
            }
            console.error('Error fetching ', error);
          }));

        const imageResponses = await Promise.all(imagePromises);
        const tempImages = {};
        validChatRooms.forEach((room, index) => {
          tempImages[room.postId] = `http://xflopvzfwqjk19996213.cdn.ntruss.com/article/${imageResponses[index].data}?type=f&w=250&h=250`;
        });
        setImages(tempImages);
      } catch (error) {
        console.error("Failed to fetch chat rooms:", error);
      }
    };

    fetchChatRooms();
  }, [userId]);

  const getCounterpartNickname = (room) => {
    if (room.sellerId.toString() === userId) {
      return room.buyerNickname;
    }
    return room.sellerNickname;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month}월 ${day}일 ${hours}:${minutes}분`;
  };

  const handleChatButtonClick = (roomId) => {
    onRoomSelect(roomId);
  };

  return (
    <ChatRoomsContainer>
      <h3>전체대화</h3>
      <ul>
        {chatRooms.map((room) => (
          <ChatRoomItem key={room.roomId}>
            <ChatRoomImage src={images[room.postId]} alt="게시글 이미지" />
            <ChatRoomContent>
              <ChatRoomName>{getCounterpartNickname(room)}</ChatRoomName>
              <MessageTitle>제목: {room.postTitle}</MessageTitle>
              <LastMessage>최근대화: {room.lastMessage?.length > 13 ? room.lastMessage.slice(0, 13) + '...' : room.lastMessage}</LastMessage>
              <DateText>{formatTime(room.lastUpdated)}</DateText>
            </ChatRoomContent>
            <ChatButton onClick={() => handleChatButtonClick(room.roomId)}>
              대화<br />시작
            </ChatButton>
          </ChatRoomItem>
        ))}
      </ul>
    </ChatRoomsContainer>
  );
};

const ChatRoomsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  width: 100%;
  background-color: #f8f9fa;
  border: 1px solid #c0c0c0;
  overflow-y: auto;
  border-radius: 5px;

  font-family: 'Noto Sans KR', sans-serif;

  h3 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
    text-align: left;
    margin-left: 20px;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const ChatRoomItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: white;
  border: 1px solid #c0c0c0;
  padding: 15px;
  border-radius: 10px;
`;

const ChatRoomContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 20px;
`;

const ChatRoomName = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;  // 간격 줄임
`;

const ChatButton = styled.button`
  padding: 5px 10px;
  background-color: #ff922b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 60px;
  height: 60px;
  text-align: center;
  font-size: 14px;
  line-height: 1.2;
`;

const MessageTitle = styled.div`
  font-size: 16px;
  font-weight: normal;  // 폰트 굵기를 일반으로 변경
  margin-bottom: 5px;  // 간격 늘림
`;

const LastMessage = styled.span`
  font-size: 14px;
  color: #777;
  display: block;
  margin-bottom: 5px;
`;

const DateText = styled.span`
  font-size: 14px;
  color: #777;
`;

const ChatRoomImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 5px;
`;

export default MyChatRooms;
