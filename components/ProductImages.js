import styled from "styled-components";
import { useState } from "react";

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
  `;

const BigImage = styled.img`
max-width: 100%;
max-height: 300px;  
min-height: 200px;
@media (max-width: 768px) {
  max-height: 250px;
  min-height: 150px;
  max-width: 250px;
  // min-width: 400px;
}
@media (max-width: 280px) {
  max-height: 80px;
  min-height: 80px;
  max-width: 80px;
  min-width: 80px;
}
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 20px;
`;

const ImageButton = styled.div`
    border: 2px solid #ccc;
    ${props => props.active ? `
      border-color: #ccc;
    ` : `
      border-color: transparent;
      opacity: 0.7;
    `}
    max-height: 30px;
    min-height: 30px;
    max-width: 30px;
    min-width: 30px;
    padding: 2px;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    align-items: center;
    @media (max-width: 768px) {
      max-height: 20px;
      min-height: 20px;
      max-width: 20px;
      min-width: 20px;
    }
    @media (max-width: 300px) {
      max-height: 10px;
      min-height: 10px;
      max-width: 10px;
      min-width: 10px;
    }
  `;

const BigImageWrapper = styled.div`
  text-align: center;
`;

export default function ProductImages({images}) {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
   <>
   <BigImageWrapper>
    <BigImage src={activeImage} alt=""/>
   </BigImageWrapper>
   <ImageButtons>
    {images?.map((image) => (
      <ImageButton 
        key={image}
        active={image===activeImage ? "true" : undefined} 
        onClick={() => setActiveImage(image)}
      > 
        <Image src={image} alt=""/>
      </ImageButton>
    ))}
   </ImageButtons>
   </>
  )
}