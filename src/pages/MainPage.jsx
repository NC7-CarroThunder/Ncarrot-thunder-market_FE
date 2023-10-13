import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Link 컴포넌트 import
import ROUTER from '../constants/router';

export default function MainPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('전체'); // 선택된 카테고리

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get('http://localhost:8888/api/posts/list');
        setPosts(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const filterPostsByCategory = () => {
    if (selectedCategory === '전체') {
      return posts;
    } else {
      return posts.filter((post) => post.itemCategory === selectedCategory);
    }
  };

  const showAllPosts = () => {
    setSelectedCategory('전체');
  };

  return (
    <MainWrapper>
      <CategoryTitle>전체 카테고리</CategoryTitle>
      <CategoryButtonRow>
        <div>
          <CategoryButton onClick={() => setSelectedCategory('DIGITAL')}>디지털 기기</CategoryButton>
          <CategoryButton onClick={() => setSelectedCategory('BOOK')}>도서</CategoryButton>
          <CategoryButton onClick={() => setSelectedCategory('ETC')}>기타</CategoryButton>
          <CategoryButton onClick={showAllPosts}>전체 게시글</CategoryButton>
        </div>
      </CategoryButtonRow>
      <StyledImage src="/vintage-collection.jpg" alt="Vintage Collection" />
      <Container>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Row>
            {filterPostsByCategory().map((post) => (
              <Col key={post.postid} md={3}>
                <Card>
                  <CardImg
                    src={post.imageUrl}
                    alt={'게시글 이미지'}
                    className="card-img-top"
                  />
                  <CardBody>
                  <Link to={`/post/${post.postid}`}>
                    <CardTitle>{post.title}</CardTitle>
                    </Link>
                    <CardText>Price: {post.price}</CardText>
                    <CardText>Address: {post.address}</CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </MainWrapper>
  );
}

const MainWrapper = styled.main`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoryTitle = styled.h1`
  margin-top: 30px;
  color: #333;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 24px;
`;

const CategoryButtonRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const StyledImage = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
  margin: 20px 0;
`;

const CategoryButton = styled.button`
  width: 6rem;
  font-size: 13px;
  padding: 10px;
  background-color: #ff922b;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: 'Noto Sans KR', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px;
  &:hover {
    background-color: #ffad6d;
  }
`;

const Container = styled.div`
  padding: 20px;
`;

const Card = styled.div`
  border: 1px solid #ddd;
  margin-bottom: 20px;
`;

const CardImg = styled.img`
  width: 100%;
`;

const CardBody = styled.div`
  padding: 10px;
`;

const CardTitle = styled.h5`
  font-size: 16px;
`;

const CardText = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Col = styled.div`
  flex: 0 0 calc(25% - 20px);
  max-width: calc(25% - 20px);
  margin: 10px;
`;
