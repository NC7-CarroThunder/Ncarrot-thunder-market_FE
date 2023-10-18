import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Storage from '../utils/localStorage';
import Axios from '../utils/api/axios';
import QUERY from '../constants/query';
import ROUTER from '../constants/router';

const axios = new Axios(QUERY.AXIOS_PATH.SEVER);

function ChatRoom({roomId}) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [targetLang, setTargetLang] = useState('ko');
  const stompClient = useRef(null);
  const messagesEndRef = useRef(null);
  const [isTranslationOptionsVisible, setTranslationOptionsVisible] = useState(
      false);

  useEffect(() => {
    setMessages([]);
    const socket = new SockJS('http://localhost:8888/api/chatting-websocket',
        [], {withCredentials: true});
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
        translateMessage(parsedMessage.content, targetLang).then(
            (translatedMessage) => {
              setMessages((prevMessages) => [
                ...prevMessages,
                {...parsedMessage, content: translatedMessage},
              ]);
            });
      });
      axios.get(`/api/chatting/message/${roomId}`)
      .then((response) => response.data)
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigator(ROUTER.PATH.LOGIN);
        }
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
    if (roomId && inputValue.trim() !== '' && stompClient.current
        && stompClient.current.connected) {
      const chatMessage = {
        roomId: roomId,
        content: inputValue,
        senderId: parseInt(Storage.getUserId()),
        targetLang: targetLang,
      };
      stompClient.current.publish(
          {destination: '/app/send', body: JSON.stringify(chatMessage)});
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

  const translateMessage = async (message, targetLang) => {
    try {
      const response = await fetch(
          'http://localhost:8888/api/chatting/translate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({message, targetLang}),
          });

      if (response.ok) {
        const data = await response.json();
        return data.translatedText;
      } else {
        console.error('Failed to translate message.');
        return message;
      }
    } catch (error) {
      console.error('Error during translation:', error);
      return message;
    }
  };

  const handleTargetLangChange = (e) => {
    setTargetLang(e.target.value);
  };

  const handleToggleTranslationOptions = () => {
    setTranslationOptionsVisible(!isTranslationOptionsVisible);
  };

  const languageOptions = [
    {value: 'ko', label: '한국어'},
    {value: 'en', label: '영어 English'},
    {value: 'ja', label: '일본어 日本語'},
    {value: 'zh-CN', label: '중국어 간체 中文(简体)'},
    {value: 'zh-TW', label: '중국어 번체 中文(繁體)'},
    {value: 'vi', label: '베트남어 Tiếng Việt'},
    {value: 'th', label: '태국어 ไทย'},
    {value: 'id', label: '인도네시아어 Bahasa Indonesia'},
    {value: 'fr', label: '프랑스어 Français'},
    {value: 'es', label: '스페인어 Español'},
    {value: 'ru', label: '러시아어 Русский'},
    {value: 'de', label: '독일어 Deutsch'},
    {value: 'it', label: '이탈리아어 Italiano'},
  ];

  return (
      <>
        <button onClick={handleToggleTranslationOptions}>언어 선택</button>
        <TranslationOptions isVisible={isTranslationOptionsVisible}>
          <div className="accordion-bar"
               onClick={handleToggleTranslationOptions}>
            <div>닫기</div>
          </div>
          <div className="language-list">
            {languageOptions.map((option) => (
                <label key={option.value}>
                  <input
                      type="radio"
                      name="language"
                      value={option.value}
                      checked={targetLang === option.value}
                      onChange={handleTargetLangChange}
                  />
                  {option.label}
                </label>
            ))}
          </div>
        </TranslationOptions>
        <MessagesContainer>
          {messages.map((message, index) => (
              <MessageBubble key={index} sender={Storage.getUserId() === String(
                  message.senderId)}>
                <span className="senderNickname">{message.senderNickname}</span>
                {message.content}
              </MessageBubble>
          ))}
          <div ref={messagesEndRef}></div>
        </MessagesContainer>
        <InputContainer>
          <TextInput value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     onKeyDown={handleKeyDown} placeholder="메시지를 입력해주세요..."/>
          <SendButton onClick={sendMessage}>보내기</SendButton>
        </InputContainer>
      </>
  );
}

export default ChatRoom;

const shouldForwardProp = (prop) => prop !== 'sender' && prop !== 'isVisible';
const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #7c7979;
  background-image: url("/img/chatroom.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50%;

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

const TranslationOptions = styled.div`
  position: fixed;
  top: 0;
  right: ${props => (props.isVisible ? '0' : '-300px')};
  width: 300px;
  height: 100%;
  background-color: #fff;
  box-shadow: -5px 0 5px rgba(0, 0, 0, 0.2);
  transition: right 0.3s ease-in-out;
  z-index: 2;
  margin-top: 70px;

  .accordion-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
  }

  .language-list {
    overflow-y: auto;
    max-height: calc(100% - 40px);
  }

  label {
    display: block;
    margin: 10px;
  }

  input[type="radio"] {
    margin-right: 5px;
    cursor: pointer;
  }
}`;
