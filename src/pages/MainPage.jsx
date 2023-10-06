import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ROUTER from '../constants/router';


export default function MainPage() {
  return (
    <MainWrapper>

    </MainWrapper>
  );
};

const MainWrapper = styled.main`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 18rem;
  padding-bottom: 1rem;
  background-color: ${props => props.theme.color.sky_white};
  font-size: ${props => props.theme.fontSize.medium};
  text-align: center;
`;
