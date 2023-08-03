import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import axios from "axios";
import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import ProductsGrid from "@/components/ProductsGrid";
import { debounce, set } from "lodash";
import Spinner from "@/components/Spinner";


const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1.2rem;
`;

const InputWrapper = styled.div`
position: sticky;
top: 68px;
margin: 25px 0;
padding: 5px 0;
background-color: #eeeeeeaa;
`;

export default function SeachPage(){
  const [phrase,setPhrase] = useState('');
  const [products,setProducts] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const debouncedSearch = useCallback(debounce(searchProducts,500), []);

  useEffect(()=>{
    if(phrase.length>0){
      setIsLoading(true);
      debouncedSearch(phrase);
    } else {
      setProducts([]); 
    }
   },[phrase]);

  function searchProducts(phrase){
    axios.get('/api/products?phrase='+encodeURIComponent(phrase))
    .then(response=> {
      setProducts(response.data);
      setIsLoading(false);
    });
  }
  return (
    <>
      <Header/>
      <Center>
        <InputWrapper>
          <SearchInput 
            autoFocus
            value={phrase}
            onChange={e=>setPhrase(e.target.value)} // explain me this line 
            placeholder="Search for products&hellip;" 
          />
        </InputWrapper>
        {!isLoading && phrase !== '' && products.length === 0 && (
          <h2>No products found for query &ldquo;{phrase}&rdquo;.</h2>
        )}
        {isLoading && (
          <Spinner fullwidth={1}/>
        )}
        {!isLoading && products.length > 0 && (
          <ProductsGrid products={products}/>
        )}
      </Center>
    </>
    
  )
}