import styled from "styled-components"
import Button from "@/components/Button";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const ProductWrapper = styled.div`
 
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items:center; 
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: .9rem;
  color: inherit;
  text-decoration: none;
  margin:0;
  @media screen and (max-width: 300px) {
    font-size: 0.7em;
  }
`;

const ProductInfoBox = styled.div`
margin-top:5px;
`;

const PriceRow = styled.div`
display: block;
margin-top: 2px;
align-items: center;
justify-content: space-between;

@media screen and (min-width: 768px) {
  display: flex;
  gap: 5px;
}
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 600;
  text-align: right;
  padding-bottom: 2px;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem; 
    font-weight: 600;
    text-align: left;
  }
  @media screen and (max-width: 300px) {
    font-size: 0.7em;
    font-weight: 700;
  }
`;

export default function ProductBox({_id,title,price,images}) {
  const {addProduct} = useContext(CartContext);
  const url = '/product/'+_id;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} alt=""/>
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>
            ${price}
          </Price>
          <Button onClick={() => addProduct(_id)} block primary={1} outline={1}>
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  )
}