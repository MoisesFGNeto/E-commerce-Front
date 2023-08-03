import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import {useContext, useState} from "react";
import {CartContext} from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import SearchIcon from "./icons/SearchIcon";

const StyledHeader = styled.header`
  background-color: #222;
  position:sticky;
  top:0;
  z-index:10;
`;
const Logo = styled(Link)`
  color:#fff;
  text-decoration:none;
  position: relative;
  z-index: 3;
  align-self: center;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav.withConfig({
  shouldForwardProp: prop => prop !== 'mobileNavActive'
})`
  ${props => props.mobileNavActive ? `
    display: block;
    mobileactive: "true";
  ` : `
    display: none;
    mobileactive: "false";
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: auto;
  left: auto;
  border-radius: 5px;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  align-self: center;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }

`;
const NavLink = styled(Link)`
  display: block;
  color:#aaa;
  text-decoration:none;
  min-width: 30px;
  padding: 10px 0;
  svg{
    height: 20px;
  }
  @media screen and (min-width: 768px) {
    padding:0;
  }
  &:hover{
    color:#fff;
    background-color: #444;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border:0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const SideIcons = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  a{
    display: inline-block;
    min-width: 20px;
    color: #fff;
    svg{
      width: 24px;
      height: 24px;
      margin-top: 5px;
    }
  }
`;

export default function Header() {
  const {cartProducts} = useContext(CartContext);
  const [mobileNavActive,setMobileNavActive] = useState(false);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>Ecommerce</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>All products</NavLink>
            <NavLink href={'/categories'}>Categories</NavLink>
            <NavLink href={'/account'}>Account</NavLink>
            <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>
          <SideIcons>
            <Link href={'/search'}><SearchIcon /></Link>
            <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
              <BarsIcon />
            </NavButton>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}