import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ROUTER from '../constants/router';

export default function MainPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('전체');

const formatPrice = (price) => {
  return price.toLocaleString('en-US');
};

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

// 게시글 등록시 카테고리선택이 구현이 되면 setSelectedCategory에 카테고리 명을 적으면 됩니다

  return (
    <MainWrapper>
      <CategoryTitle>전체 카테고리</CategoryTitle>
      <CategoryButtonRow>
        <div>
    <CategoryButton onClick={showAllPosts}>전체 게시글</CategoryButton>
    <CategoryButton onClick={() => setSelectedCategory('DIGITAL')}>디지털 기기</CategoryButton>
    <CategoryButton onClick={() => setSelectedCategory('가구/인테리어')}>가구/인테리어</CategoryButton>
    <CategoryButton onClick={() => setSelectedCategory('의류')}>의류</CategoryButton>
    <CategoryButton onClick={() => setSelectedCategory('생활가전')}>생활가전</CategoryButton>
    <CategoryButton onClick={() => setSelectedCategory('생활/주방')}>생활/주방</CategoryButton>
    </div>
    </CategoryButtonRow>
    <CategoryButtonRow>
    <div>
    <CategoryButton onClick={() => setSelectedCategory('스포츠/레저')}>스포츠/레저</CategoryButton>
    <CategoryButton onClick={() => setSelectedCategory('자동차/공구')}>자동차/공구</CategoryButton>
    <CategoryButton onClick={() => setSelectedCategory('BOOK')}>도서</CategoryButton>
    <CategoryButton onClick={() => setSelectedCategory('뷰티/미용')}>뷰티/미용</CategoryButton>
    <CategoryButton onClick={() => setSelectedCategory('반려동물용품')}>반려동물용품</CategoryButton>
    <CategoryButton onClick={() => setSelectedCategory('ETC')}>기타</CategoryButton>
        </div>
      </CategoryButtonRow>
      {/* <StyledImage src="/vintage-collection.jpg" alt="Vintage Collection" /> */}
      <Container>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Row>
            {filterPostsByCategory().map((post) => (
              <Col key={post.postid} md={3}>
              <Link to={`/post/${post.postid}`}>
                <Card>
                {/* http://xflopvzfwqjk19996213.cdn.ntruss.com/article/2501df8f-e7a4-4f28-a15d-405d28fcb7dc?type=f&w=250&h=250 */}
                  <CardImg
                    src={`http://xflopvzfwqjk19996213.cdn.ntruss.com/article/${post.attachedFilesPaths[0].filePath}?type=f&w=250&h=250`}
                    alt={'게시글 이미지'}
                    className="card-img-top"
                  />
                  <CardBody>
                      <CardTitle>{post.title}</CardTitle>
                    <CardText><strong>{formatPrice(post.price)}원</strong></CardText>
                    {/* <CardText>Address: {post.address}</CardText> 게시글 주소 */}
                  </CardBody>
                </Card>
                </Link>
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
  margin: 0 auto; 
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

// const StyledImage = styled.img`
//   width: 180px;
//   height: 180px;
//   object-fit: cover;
//   margin: 20px 0;
// `;

const CategoryButton = styled.button`
  width: 7rem;
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
  border-radius: 5%;
`;

const CardImg = styled.img`
  width: 100%;
  border-radius: 5%
`;

const CardBody = styled.div`
  padding: 10px;
`;

const CardTitle = styled.text`
  font-size: 16px;
`;

const CardText = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px; /* 최대 너비 설정 */
`;

const Col = styled.div`
  max-width: calc(25% - 20px);
  width: 250px;
  margin: 10px;
`;
