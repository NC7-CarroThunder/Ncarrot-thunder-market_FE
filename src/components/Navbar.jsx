import React, { useState, useEffect } from 'react';
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
  const [imageClick, setImegeClick] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (!keyWord) return;
    navigate(`/search/${keyWord}`);
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

  const handleChatButtonClick = () => {
    navigate(ROUTER.PATH.CHATTING);  // 이 부분은 새로운 경로를 ROUTER.PATH에 추가하거나 기존 경로를 사용하면 됩니다.
  };

  const clickImage = () => {
    setImegeClick((state) => !state)
  }

  useEffect(() => {
    if (imageClick != null) {
      onShowMyMenu((state) => (!state));
    }


  }, [imageClick]);


  return (
    <NavbarWrapper>
      <NavbarContainer>
        <LogoContainer>
          <Link to={ROUTER.PATH.MAIN}>
            <Logo onClick={handleLogoClick}>
              <img src='/img/chatroom.png' alt='' />
            </Logo>
          </Link>
          <Link to={ROUTER.PATH.HOT_ARTICLES}>
            <Text large_regular onClick={handleTransaction}>
              CarrortThunder
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
          {nickname ? (
            <ShowMyMenuContainer>
              <Text large_medium>
                {(Storage.getPhoto() == undefined) ? (
                  <FaUserCircle id='MyMenu' onClick={clickImage} />
                ) : (
                  <img
                    src={`https://kr.object.ncloudstorage.com/carrot-thunder/user/${Storage.getPhoto()}`}
                    style={{
                      width: '1.2cm',
                      height: '1.2cm',
                      overflow: 'hidden',
                      borderRadius: '50%',
                      cursor: 'pointer'
                    }}
                    onClick={clickImage}
                  />

                )}
              </Text>
              <span>{nickname}</span> {/* 아이콘 바로 뒤에 닉네임을 위치시킵니다. */}
              {showMyMenu ? (
                <ShowMyMenu>
                  <span onClick={handleChatButtonClick}>캐럿톡</span>
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
    width: 5rem;
    height: 4rem;
  }
`;

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 30rem;
  width: 100%;
  gap: 1rem;

  svg {
    color: ${props => props.theme.color.messenger};
    cursor: pointer;
  }
`;
const ShowMyMenuContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 1rem;
  white-space:nowrap;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

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
