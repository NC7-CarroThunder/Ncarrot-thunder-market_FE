import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../elements/Button';
import Input from '../elements/Input';
import Text from '../elements/Text';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import ROUTER from '../constants/router';
import Storage from '../utils/localStorage';
import { useQueryClient } from '@tanstack/react-query';

export default function Navbar({ showMyMenu, onShowMyMenu, onLogOut }) {
  const [keyWord, setKeyWord] = useState('');

  const navigate = useNavigate();
  const nickname = Storage.getNickName();
  const query = useQueryClient();

  const handleSubmit = e => {
    e.preventDefault();
    if (!keyWord) return;
    navigate(`/search/${keyWord}`);
  };

  const handleChatMenu = () => {
    query.invalidateQueries(['rooms']);
    navigate(`${ROUTER.PATH.MESSENGER}/${-1}`);
  };

  const handleLogoClick = () => {
    query.invalidateQueries(['posts']);
  };

  const handleTransaction = () => {
    query.invalidateQueries(['HotPost']);
  };

  const handleLogout = e => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      window.localStorage.clear();
      navigate(ROUTER.PATH.MAIN)
    }
  };


  return (
    <NavbarWrapper>
      <NavbarContainer>
        <LogoContainer>
          <Link to={ROUTER.PATH.MAIN}>
            <Logo onClick={handleLogoClick}>
              <img src='/img/logo.png' alt='' />
            </Logo>
          </Link>
          <Link to={ROUTER.PATH.HOT_ARTICLES}>
            <Text large_regular onClick={handleTransaction}>
              중고거래
            </Text>
          </Link>
        </LogoContainer>
        <FormContainer onSubmit={handleSubmit}>
          <Input
            placeholder='물품이나 동네를 검색해 보세요.'
            inLineLabel
            label={<AiOutlineSearch />}
            value={keyWord}
            onChange={e => setKeyWord(e.target.value)}
          />
          {nickname}
          {nickname ? (
            <ShowMyMenuContainer>
              <Text large_medium>
                <FaUserCircle id='MyMenu' onClick={onShowMyMenu} />
              </Text>
              {showMyMenu ? (
                <ShowMyMenu>
                  <span onClick={handleChatMenu}>채팅</span>

                  <span>
                    <Link to={ROUTER.PATH.MYPAGE}> 마이페이지 </Link>
                  </span>

                  <span>
                    {' '}
                    <Link to={ROUTER.PATH.ADDPOST}>게시글 작성 </Link>
                  </span>

                  <span onClick={handleLogout}>로그아웃</span>
                </ShowMyMenu>
              ) : (
                ''
              )}
            </ShowMyMenuContainer>
          ) : (
            <Link to={ROUTER.PATH.LOGIN}>
              <Button small type='button'>
                로그인
              </Button>
            </Link>
          )}
        </FormContainer>
      </NavbarContainer>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 42rem;
  background-color: ${props => props.theme.color.white};
  z-index: 1000;
`;

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 70rem;
  width: 100%;
  padding: 0 1rem;
`;

const LogoContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  p {
    color: ${props => props.theme.color.carrot_orange};
  }
`;

const Logo = styled.div`
  img {
    width: 8rem;
    height: 2.5rem;
  }
`;

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 20rem;
  width: 100%;
  gap: 1rem;

  svg {
    color: ${props => props.theme.color.messenger};
    cursor: pointer;
  }
`;
const ShowMyMenuContainer = styled.div`
  position: relative;
`;

const ShowMyMenu = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.25px solid ${props => props.theme.color.messenger};
  border-radius: 0.5rem;
  background-color: ${props => props.theme.color.white};
  transform: translate(0, 4rem);
  z-index: 1000;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8rem;
    height: 1.5rem;
    padding: 1rem;
    border-bottom: 0.25px solid ${props => props.theme.color.messenger};
    font-size: 100%;
    cursor: pointer;

    :hover {
      background-color: ${props => props.theme.color.messenger};
    }

    &:first-child {
      border-radius: 0.5rem 0.5rem 0 0;
    }

    &:last-child {
      border: none;
      border-radius: 0 0 0.5rem 0.5rem;
    }
  }

  a {
    font-size: 100%;
  }
`;
