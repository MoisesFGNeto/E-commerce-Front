import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import ConstructionIcon from "@/components/icons/ConstructionIcon";
import styled from "styled-components";
import Footer from "@/components/Footer";

const AlignTextIcon = styled.div`
display: block;
text-align: center;

  @media screen and (min-width: 768px) {
    align-items: center;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
`;

const MarginWhiteBox = styled.div`
margin-top: 30px;
`;

export default function UnderConstruction() {
  return (
    <>
      <Header/>
      <Center>
        <MarginWhiteBox/>
        <WhiteBox>
          <AlignTextIcon>
          <Title>
            This Page is currently under construction.
          </Title> 
          <ConstructionIcon/>
          </AlignTextIcon>
        </WhiteBox>  
      </Center>
      <Footer/>
    </>
  )
}