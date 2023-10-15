import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Storage from '../utils/localStorage';

function ChatRoom({ roomId }) {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
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
                userId: userId
            }
        });

        stompClient.current.onConnect = (frame) => {
            console.log('Connected: ' + frame);
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
            stompClient.current.subscribe(`/topic/messages/${roomId}`, (message) => {
                setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);
            });

            fetch(`http://localhost:8888/api/chatting/message/${roomId}`)
                .then(response => response.json())
                .then(data => {
                    setMessages(data);
                })
                .catch(error => {
                    console.error("Error fetching old messages:", error);
                });
        };

        stompClient.current.activate();

        return () => {
            if (stompClient.current.connected) {
                stompClient.current.deactivate();
            }
        };
    }, [roomId]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const sendMessage = () => {
        if (roomId && inputValue.trim() !== '' && stompClient.current && stompClient.current.connected) {
            const chatMessage = {
                roomId: roomId,
                content: inputValue,
                senderId: parseInt(Storage.getUserId())
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

    return (
        <>
            <MessagesContainer>
                {messages.map((message, index) => (
                    <MessageBubble 
                        key={index} 
                        sender={Storage.getUserId() === String(message.senderId)}
                    >
                        <span className="senderNickname">{message.senderNickname}</span>
                        {message.content}
                    </MessageBubble>
                ))}
                <div ref={messagesEndRef}></div>
            </MessagesContainer>
            <InputContainer>
                <TextInput value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type a message..." />
                <SendButton onClick={sendMessage}>Send</SendButton>
            </InputContainer>
        </>
    );
}

export default ChatRoom;

const shouldForwardProp = (prop) => prop !== 'sender';

const MessagesContainer = styled.div`
    flex: 1;
    overflow-y: auto;  // 스크롤 가능하게 수정
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
    border-radius: ${props => props.sender ? '10px 10px 10px 0' : '10px 10px 0 10px'};
    align-self: ${props => props.sender ? 'flex-end' : 'flex-start'};
    color: #ffffff;
    display: inline-block;

    .senderNickname {
        font-size: 0.7em;
        display: block;
        margin-bottom: 5px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);  // 연한 구분선 추가
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
