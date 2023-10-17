import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Storage from '../utils/localStorage';

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [targetLang, setTargetLang] = useState('ko'); // 초기값을 한국어로 설정
  const stompClient = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([]);
    const socket = new SockJS('http://localhost:8888/api/chatting-websocket', [], { withCredentials: true });
    const userId = Storage.getUserId();

    stompClient.current = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      connectHeaders: {
        userId: userId,
      },
    });

    stompClient.current.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
      stompClient.current.subscribe(`/topic/messages/${roomId}`, (message) => {
        const parsedMessage = JSON.parse(message.body);
        // 수정: 백엔드로 번역 요청
        translateMessage(parsedMessage.content, targetLang).then((translatedMessage) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { ...parsedMessage, content: translatedMessage },
          ]);
        });
      });

      fetch(`http://localhost:8888/api/chatting/message/${roomId}`)
        .then((response) => response.json())
        .then((data) => {
          setMessages(data);
        })
        .catch((error) => {
          console.error('Error fetching old messages:', error);
        });
    };

    stompClient.current.activate();

    return () => {
      if (stompClient.current.connected) {
        stompClient.current.deactivate();
      }
    };
  }, [roomId, targetLang]);

  const sendMessage = () => {
    if (roomId && inputValue.trim() !== '' && stompClient.current && stompClient.current.connected) {
      const chatMessage = {
        roomId: roomId,
        content: inputValue,
        senderId: parseInt(Storage.getUserId()),
        targetLang: targetLang, // 프론트에서 선택한 타겟 언어 전달
      };
      stompClient.current.publish({ destination: '/app/send', body: JSON.stringify(chatMessage) });
      setInputValue('');
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      sendMessage();
    }
  };

  // 수정: 백엔드 서비스로 번역 요청 보내기
  const translateMessage = async (message, targetLang) => {
    try {
      const response = await fetch('http://localhost:8888/api/chatting/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, targetLang }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.translatedText;
      } else {
        console.error('Failed to translate message.');
        return message; // 번역 실패 시 원본 메시지 반환
      }
    } catch (error) {
      console.error('Error during translation:', error);
      return message; // 번역 실패 시 원본 메시지 반환
    }
  };

  const handleTargetLangChange = (e) => {
    setTargetLang(e.target.value);
  };

  return (
    <>
      <MessagesContainer>
        {messages.map((message, index) => (
          <MessageBubble key={index} sender={Storage.getUserId() === String(message.senderId)}>
            <span className="senderNickname">{message.senderNickname}</span>
            {message.content}
          </MessageBubble>
        ))}
        <div ref={messagesEndRef}></div>
      </MessagesContainer>
      <InputContainer>
        <TextInput value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="메시지를 입력해주세요..." />
        <select value={targetLang} onChange={handleTargetLangChange}>
          <option value="ko">한국어</option>
          <option value="en">English</option>
          <option value="es">Español</option>
          {/* 다른 언어 옵션을 추가할 수 있음 */}
        </select>
        <SendButton onClick={sendMessage}>보내기</SendButton>
      </InputContainer>
    </>
  );
}

export default ChatRoom;

const shouldForwardProp = (prop) => prop !== 'sender';

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto; // 스크롤 가능하게 수정
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #7c7979;
  background-image: url("/img/chatroom.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50%;

  // 웹킷 기반 브라우저용 스크롤바 디자인 수정
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

const MessageBubble = styled.div.withConfig({
  shouldForwardProp
})`
  max-width: 60%;
  padding: 10px 15px;
  margin-bottom: 10px;
  background-color: ${props => props.sender ? '#73aace' : '#7c7979'};
  border-radius: ${props => props.sender ? '10px 10px 10px 0'
          : '10px 10px 0 10px'};
  align-self: ${props => props.sender ? 'flex-end' : 'flex-start'};
  color: #ffffff;
  display: inline-block;

  .senderNickname {
    font-size: 0.7em;
    display: block;
    margin-bottom: 5px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    padding-bottom: 2px;
  }
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
