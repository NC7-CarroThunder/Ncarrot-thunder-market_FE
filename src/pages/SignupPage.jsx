import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from '../utils/api/axios';
import styled from 'styled-components';
import QUERY from '../constants/query';
import ROUTER from '../constants/router';
import DaumPost from './DaumPost';


export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const axios = new Axios(QUERY.AXIOS_PATH.SEVER);
  const navigate = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();

    axios
      .post(QUERY.AXIOS_PATH.SIGNUP, {
        email,
        password,
        nickname,
        phone,
        address,
        detailAddress,
      })
      .then(() => navigate(ROUTER.PATH.LOGIN));
  };

  return (
    <LoginContainer>
      <Form onSubmit={onSubmit}>
        <Titleheader>회원가입</Titleheader>
        <Label htmlFor='username'>이메일</Label>
        <Input
          type='text'
          id='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Label htmlFor='password'>비밀번호</Label>
        <Input
          type='password'
          id='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Label htmlFor='nickname'>닉네임</Label>
        <Input
          type='text'
          id='nickname'
          value={nickname}
          onChange={e => setNickname(e.target.value)}
        />
        <Label htmlFor="phone">휴대폰 번호</Label>
        <Input
          type="text"
          id="phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />

        <Label htmlFor="address">주소</Label>
        <div>
          <DaumPost setAddress={setAddress} />
        </div>
        <Input
          type="text"
          id="areaAddress"
          value={address}
          readOnly
          onChange={e => setAddress(e.target.value )}
        />

        <Label htmlFor="detailAddress">상세 주소</Label>
        <Input
          type="text"
          id="detailAddress"
          value={detailAddress}
          onChange={e => setDetailAddress(e.target.value)}
        />
        <Button type='submit'>회원가입</Button>
        <Link to={ROUTER.PATH.BACK}>
          <Button type='button'>뒤로가기</Button>
        </Link>
      </Form>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
  font-family: 'Nanum Gothic', sans-serif;
`;

const Titleheader = styled.div`
  display: flex;
  justify-content: center;
  font-size: 23px;
  font-weight: bold;
  margin-bottom: 20px;
  font-family: 'Noto Sans KR', sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
  margin: 0 auto;
  padding: 60px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  font-family: 'Noto Sans KR', sans-serif;
`;

const Label = styled.label`
  font-size: 18px;
  color: #212529;
`;

const Input = styled.input`
  font-size: 18px;
  padding: 12px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
`;

const Button = styled.button`
  width: 14rem;
  font-size: 18px;
  padding: 12px;
  background-color: #ff922b;
  color: #fff;
  border: none;
  font-family: 'Noto Sans KR', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 8px;

  &:hover {
    background-color: #ffad6d;
  }
`;
