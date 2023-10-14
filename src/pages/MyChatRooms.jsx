import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Storage from '../utils/localStorage';

const MyChatRooms = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const userId = Storage.getUserId();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/api/chatting/myChatRooms?userId=${userId}`);
        setChatRooms(response.data.chatRooms);
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

  const handleChatButtonClick = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  return (
    <ChatRoomsContainer>
      <h3>채팅방 목록</h3>
      <ul>
        {chatRooms.map((room) => (
          <ChatRoomItem key={room.roomId}>
            <div>
              {getCounterpartNickname(room)}와의 채팅방: {room.lastMessage}
            </div>
            <div>
              게시글 제목: {room.postTitle}
            </div>
            <ChatButton onClick={() => handleChatButtonClick(room.roomId)}> 
              채팅하기
            </ChatButton>
          </ChatRoomItem>
        ))}
      </ul>
    </ChatRoomsContainer>
  );
};

const ChatRoomsContainer = styled.div`
  margin-left: 250px;
  margin-bottom: 20px;
`;

const ChatRoomItem = styled.li`
  margin-bottom: 20px; 
  background-color: white;
  border: 1px solid #c0c0c0;
  padding: 10px 20px;
  border-radius: 10px;
`;

const ChatButton = styled.button`
  padding: 5px 10px;
  background-color: #ff922b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

export default MyChatRooms;
