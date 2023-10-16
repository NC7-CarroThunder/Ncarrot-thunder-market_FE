import React, {useState} from 'react';
import styled from 'styled-components';
import MyChatRooms from './MyChatRooms';
import ChatRoom from './ChatRoom';

const ChattingPage = () => {
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const handleRoomSelect = (roomId) => {
    console.log("Selected Room ID:", roomId);
    setSelectedRoomId(roomId);
  };

  return (
      <ChattingPageContainer>
        <MyChatRoomsContainer>
          <MyChatRooms onRoomSelect={handleRoomSelect}/>
        </MyChatRoomsContainer>
        <ChatRoomContainer>
          {selectedRoomId ? <ChatRoom roomId={selectedRoomId}/> :
              <>
                <PlaceholderContainer>
                  <PlaceholderImage src="/img/chatroom.png"
                                    alt="Chatroom Placeholder"/>
                </PlaceholderContainer>
                <InputContainer>
                  <TextInput placeholder="메세지를 입력해주세요..." disabled/>
                  <SendButton disabled>보내기</SendButton>
                </InputContainer>
              </>
          }
        </ChatRoomContainer>
      </ChattingPageContainer>
  );
};

const ChattingPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70vh;
  gap: 10px;
  margin-top: 70px;
`;

const ChatRoomContainer = styled.div`
  flex: none;
  width: 27vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  border-left: 1px solid #c0c0c0;
  overflow-y: hidden;
`;

const MyChatRoomsContainer = styled.div`
  flex: none;
  width: 25vw;
  height: 70vh;
  border-right: 1px solid #c0c0c0;
  overflow-y: hidden;
`;

const PlaceholderContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PlaceholderImage = styled.img`
  max-width: 50%;
  opacity: 0.5;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #7c7979;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #7c7979;
  border-radius: 5px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  background-color: #73aace;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #497da0;
  }
`;

export default ChattingPage;