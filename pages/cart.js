import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import Footer from "@/components/Footer";
import {RevealWrapper} from "next-reveal";
import { useSession } from "next-auth/react";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 40px;
  table thead tr th:nth-child(3),
  table tbody tr td:nth-child(3),
  table tbody tr.subtotal td:nth-child(2) {
    text-align: right;
  }
  table tr.subtotal td {
    padding: 15px 0;
    font-size: 1.1em;
    @media screen and (max-width: 280px) {
      font-size: 0.8em;
  }
  table tr.coupon td:last-child {
    font-size: 0.6em;
    @media screen and (max-width: 280px) {
      font-size: 0.6em;
  }
  table tbody tr.subtotal td:nth-child(1) {
    color: red;
  }
  table tbody tr.subtotal td:last-child {
    font-size: 0.5em;
  }
`;
const PaddingBottom = styled.div`
  padding-bottom : 60px; 
`;
const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  @media screen and (max-width: 280px) {
    padding: 10px;
    margin-left: -7px;
    button{
      font-size: 0.7em;
    }
  }
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
  @media screen and (max-width: 280px) {
    span{
      font-size: 0.7em;
    }
  }
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 2px;
  width: 35px;
  margin-left: 15px;
  @media screen and (min-width: 768px) {
    display: inline; 
    margin-left: 0;
  }
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

const StyledTableRow = styled.tr`
  font-size: 0.8em;
  @media screen and (max-width: 280px) {
    font-size: 0.6em;
  }
  td{
    padding: 20px 0;
    color: #666;
  }
`;

export default function CartPage() {
  const {cartProducts,addProduct,removeProduct,clearCart} = useContext(CartContext);
  const {data: session} = useSession();
  const [products,setProducts] = useState([]);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [city,setCity] = useState('');
  const [postalCode,setPostalCode] = useState('');
  const [streetAddress,setStreetAddress] = useState('');
  const [country,setCountry] = useState('');
  const [isSuccess,setIsSuccess] = useState(false);
  const [shippingFee,setShippingFee] = useState(null);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', {ids:cartProducts})
        .then(response => {
          setProducts(response.data);
        })
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
    if (typeof window === 'undefined') { 
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
    axios.get('/api/settings?name=shippingFee').then(response => {
      setShippingFee(response.data.value);
    })
  }, []);
  useEffect(() => {
    if (!session) {
      return;
    }
    axios.get('/api/address')
      .then(response => {
        const address = response.data || {
          name: "",
          email: "",
          city: "",
          postalCode: "",
          streetAddress: "",
          country: "",
        };
        setName(address.name);
        setEmail(address.email);
        setCity(address.city);
        setPostalCode(address.postalCode);
        setStreetAddress(address.streetAddress);
        setCountry(address.country);
      })
      .catch(error => {
        console.error(error);
      });
  }, [session]);
  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  async function goToPayment() {
    const response = await axios.post('/api/checkout', {
      name,email,city,postalCode,streetAddress,country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }
  let productsTotal = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    productsTotal += price;
  }
  
  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
        <RevealWrapper delay={0}>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt=""/>
                        </ProductImageBox>
                        <span>{product.title}</span>
                      </ProductInfoCell>
                      <td>
                        <ButtonContainer>
                          <Button
                            primary={1}
                            onClick={() => lessOfThisProduct(product._id)}>
                            -
                          </Button>
                          <QuantityLabel>
                            {cartProducts.filter(id => id === product._id).length}
                          </QuantityLabel>
                          <Button
                            primary={1}
                            onClick={() => moreOfThisProduct(product._id)}>
                            +
                          </Button>
                        </ButtonContainer>                      
                      </td>
                      <td>
                        ${cartProducts.filter(id => id === product._id).length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr className="subtotal">
                    <td colSpan={2}>Products</td>
                    <td>${productsTotal}</td>
                  </tr>
                  <tr className="subtotal">
                    <td colSpan={2}>Shipping</td>
                    <td>${shippingFee}</td>
                  </tr>
                  <tr className="subtotal total">
                    <td colSpan={2}>Total</td>
                    <td>${Number(productsTotal) + Number(shippingFee)}</td>
                  </tr>
                  <StyledTableRow>
                    <td colSpan={3}>Use our CODE: <strong>&quot;10OFF&quot;</strong> and get 10% off on the checkout page.</td>
                  </StyledTableRow>
                  
                
                </tbody>
              </Table>
            )}
          </Box>
          </RevealWrapper>
          {!!cartProducts?.length && ( 
            <RevealWrapper delay={100}>
            <Box>
              <h2>Order information</h2>
              <Input type="text"
                     placeholder="Name"
                     value={name}
                     name="name"
                     onChange={ev => setName(ev.target.value)} />
              <Input type="text"
                     placeholder="Email"
                     value={email}
                     name="email"
                     onChange={ev => setEmail(ev.target.value)}/>
              <CityHolder>
              <Input type="text"
                      placeholder="City"
                      value={city}
                      name="city"
                      onChange={ev => setCity(ev.target.value)}/>
              <Input type="text"
                      placeholder="Postal Code"
                      value={postalCode}
                      name="postalCode"
                      onChange={ev => setPostalCode(ev.target.value)}/>
              </CityHolder>
              <Input type="text"
                     placeholder="Street Address"
                     value={streetAddress}
                     name="streetAddress"
                     onChange={ev => setStreetAddress(ev.target.value)}/>
              <Input type="text"
                     placeholder="Country"
                     value={country}
                     name="country"
                     onChange={ev => setCountry(ev.target.value)}/>
              <Button black = {1}
                      onClick={goToPayment}>
                Continue to payment
              </Button>
            </Box>
            </RevealWrapper>
          )}
        </ColumnsWrapper>
      </Center>
      <PaddingBottom/>
      <Footer/>
    </>
  );
}