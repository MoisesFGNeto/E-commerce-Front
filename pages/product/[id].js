import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import CartIcon from "@/components/icons/CartIcon";
import ProductReviews from "@/components/ProductReviews";
import { mongooseConnect } from "@/lib/mongoose";
import {Product} from "@/models/Product";
import styled from "styled-components";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 30px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 280px) {
    margin-left: -10px;
  }
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.4em;
`;

const Padding = styled.div`
@media screen and (max-width: 768px) {
  padding-bottom: 40px;
  margin-top: -40px;
}
`;

export default function ProductPage({product}){
  const {addProduct} = useContext(CartContext);
  return (
      <>
      <Header/>
      <Center>
        <ColWrapper> 
          <WhiteBox> 
            <ProductImages images={product.images}/>
          </WhiteBox>
          <Padding>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>${product.price}</Price>
              </div>
              <div>
                <Button 
                  primary={1} 
                  onClick={()=>addProduct(product._id)}>
                  <CartIcon />Add to cart
                </Button>
              </div>
            </PriceRow>
          </Padding>
        </ColWrapper>
        <ProductReviews product={product}/>
      </Center>       
      </>
  )
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const {id} = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }
  }
}