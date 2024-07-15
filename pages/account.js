import Header from "@/components/Header";
import Button from "@/components/Button";
import Center from "@/components/Center";
import styled from "styled-components";
import { signIn, signOut, useSession } from "next-auth/react";
import WhiteBox from "@/components/WhiteBox";
import {RevealWrapper} from "next-reveal";
import Input from "@/components/Input";
import {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import ProductBox from "@/components/ProductBox";
import Tabs from "@/components/Tabs";
import SingleOrder from "@/components/SingleOrder";
import {withSwal} from "react-sweetalert2";

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 40px 0;
  box-sizing: border-box;
  p{
    margin: 5px;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
`;

const FormDiv = styled.div`
  border: 1px solid grey;
  border-radius: 8px;
  padding: 15px;
  height: 285px;
`;

const Error = styled.p`
  color: red;
  font-size:13px;
`;

const Label = styled.span`
  font-size:12px;
`;

const HARD_CODED_EMAIL = "myecommerceadm2023@gmail.com";
const HARD_CODED_PASSWORD = "ecommerce_test";

function AccountPage({swal}) {
  const {data: session} = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [wishedlistLoaded, setwishedlistLoaded] = useState(true);
  const [ordersLoaded, setOrdersLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('Orders');
  const [orders, setOrders] = useState([]); 

  async function logout(){
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }
  async function login(){
    await signIn('google', {callbackUrl: '/account'});
  }

  async function credentialsLogin(e) {
    e.preventDefault();
    if (email === HARD_CODED_EMAIL && password === HARD_CODED_PASSWORD) {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (!result.error) {
        window.location.reload(); 
      } else {
        setError('Login failed. Try again with the correct admin credentials');
      }
    } else {
      setError('Login failed. Try again with the correct admin credentials');
    }
  }
  
  function saveAddress() {
    const data = {name,email,city,postalCode,streetAddress,country};
    axios.put('/api/address', data).then(() => {
      swal.fire({
        title: 'Address updated',
        icon: 'success',
      });
    });
  }

  useEffect(() => {
    if (!session) {
      return;
    };
    setwishedlistLoaded(false);
    setOrdersLoaded(false);
    axios.get('/api/address').then(response => {
      if (response.data === null) {
        setName('');
        setEmail('');
        setCity('');
        setPostalCode('');
        setStreetAddress('');
        setCountry('');
      } else {
        setName(response.data.name);
        setEmail(response.data.email);
        setCity(response.data.city);
        setPostalCode(response.data.postalCode);
        setStreetAddress(response.data.streetAddress);
        setCountry(response.data.country);
      }
      setAddressLoaded(true);
    });
    axios.get('/api/wishlist').then(response => {
      setWishedProducts(response.data.map(wp => wp.product));
      setwishedlistLoaded(true);
    })
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
      setOrdersLoaded(true);
    });
  }, [session]);
  function productRemovedFromWishlist(idToRemove){
    setWishedProducts(products => {
      return [...products.filter(p => p._id.toString() !== idToRemove)];
    });
  }
  return (
    <>
    <Header/>
    <Center>
      <ColsWrapper>
        <div>
          <RevealWrapper delay={0}>
            <WhiteBox>
            <Tabs 
              tabs={['Orders','Wishlist']} 
              active={activeTab} 
              onChange={setActiveTab}
            />
            {activeTab === 'Orders' && (
              <>
              {!ordersLoaded && (
                <Spinner fullwidth={1}/>
              )}
              {ordersLoaded && (
                <>
                <div>
                  {orders.length === 0 && !session &&(
                    <p>Login to see your orders</p>
                  )}
                  {orders.length === 0 && session &&(
                    <p>You have placed no orders.</p>
                  )}
                  {orders.length > 0 && orders.map(order => (
                    <SingleOrder {...order} key={order._id}/>
                  ))}
                </div>
                </>
              )}
              </>
            )}
            {activeTab === 'Wishlist' && (
              <>
              {!wishedlistLoaded && (
                <Spinner fullwidth={1}/>
              )}
              {wishedlistLoaded && (
                <>
                 <WishedProductsGrid>
                  {wishedProducts.length > 0 && wishedProducts.map(wp => (
                    <ProductBox 
                      {...wp} key={wp._id} wished={1} 
                      onRemoveFromWishlist={productRemovedFromWishlist}
                    />
                  ))}
                 </WishedProductsGrid>
                  {wishedProducts.length === 0 && (
                <>
                  {session && (
                    <p>Your wishlist is empty</p>
                  )}
                  {!session && (
                    <p>Login to add products to your wishlist</p>
                  )}
                </>
               )}
                </>
              )}
              </>
            )}
            </WhiteBox>
          </RevealWrapper>
        </div>
        <div>
          <RevealWrapper delay={'100'}>
            <WhiteBox>
              <h2>{session ? 'Account details' : 'Login'}</h2>
              {!addressLoaded &&(
                <Spinner fullwidth={1}/>
              )}
              {addressLoaded && session &&(
                <> 
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
              <Button black={1}
                      block={1}
                      onClick={saveAddress}>
                Save
              </Button>
              <hr />
              </>
            )}
              {session && (
                <Button block={1} primary={1} onClick={logout}>Logout</Button>
              )}
              {!session && (
                <>
                <FormDiv>
                <form>
                  <div> 
                    <Error>{error}</Error>
                    <Label htmlFor="email">Email: myecommerceadm2023@gmail.com</Label>
                    <Input 
                      type="email" 
                      required
                      id="email" 
                      onChange={(e) => setEmail(e.target.value)}
                      />
                  </div>
                  <div> 
                    <Label htmlFor="email">Password: ecommerce_test</Label>
                    <Input 
                      type="password" 
                      required
                      id="password" 
                      onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                  <Button block={1} black={1} onClick={credentialsLogin} margintop="20px">Submit</Button>
                  <Button block={1} primary={1} onClick={login} margintop="20px">Login with Google</Button>
                </form> 
                </FormDiv>           
                </>
                
              )}
            </WhiteBox>
          </RevealWrapper>
        </div>
      </ColsWrapper>
    </Center>
    </>
  )
}

export default withSwal (({swal}) => (
  <AccountPage swal={swal}/>
));