import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function PostDetailPage() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPostDetails() {
      try {
        const response = await axios.get(`http://localhost:8888/api/posts/${postId}`);
        setPost(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post details:', error);
        setLoading(false);
      }
    }

    fetchPostDetails();
  }, [postId]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <PostWrapper>
          <h1>{post.title}</h1>
          <p>가격: {post.price}원</p>
          <p>내용: {post.content}</p>
          <p>주소: {post.address}</p>
          {/* 다른 게시글 정보를 렌더링 */}
        </PostWrapper>
      )}
    </div>
  );
}

const PostWrapper = styled.div`
  /* 게시글 상세 페이지 스타일링 */
  h1 {
    font-size: 24px;
  }
  p {
    font-size: 16px;
  }
`;
