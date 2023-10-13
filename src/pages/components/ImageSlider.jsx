import React, { useState } from 'react';
import styled from 'styled-components';

const images = [
  '/image1.jpg',
  '/image2.jpg',
  '/image3.jpg',
  '/image4.jpg',
  '/image5.jpg',
];

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleMouseOver = () => {
    // 마우스 오버 이벤트가 발생하면 다음 이미지로 변경
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <SliderContainer onClick={handleMouseOver}>
      <SliderImage src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  width: 200px;
  height: 200px;
  overflow: hidden;
  position: relative;
`;

const SliderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease-in-out;
`;

export default ImageSlider;