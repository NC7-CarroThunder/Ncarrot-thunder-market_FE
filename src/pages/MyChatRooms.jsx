import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Storage from '../utils/localStorage';

const MyChatRooms = ({onRoomSelect}) => {
  const [chatRooms, setChatRooms] = useState([]);
  const userId = Storage.getUserId();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get(
            `http://localhost:8888/api/chatting/myChatRooms?userId=${userId}`);
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
    onRoomSelect(roomId);  // UUID형식이므로 유의할것
  };

  return (
      <ChatRoomsContainer>
        <h3>전체대화</h3>
        <ul>
          {chatRooms.map((room) => (
              <ChatRoomItem key={room.roomId}>
                <div>
                  {getCounterpartNickname(room)}{room.lastMessage}
                </div>
                <div>
                  제목: {room.postTitle}
                </div>
                <ChatButton onClick={() => handleChatButtonClick(room.roomId)}>
                  대화시작
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

  h3 {
    font-family: 'Arial', sans-serif;
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
