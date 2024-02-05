import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import {useState} from "react";
import BarsIcon from "@/components/icons/Bars";
import SearchIcon from "./icons/SearchIcon";
import CartMaterialUI from "./CartMaterialUI";

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
  right: 0;
  padding: 70px 20px 10px;
  text-align: right;
  background-color: #222;
  align-self: center;
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }

`;
const NavLink = styled(Link)`
  display: block;
  color:#aaa;
  font-size: 1em;
  text-decoration:none;
  min-width: 30px;
  padding: 10px 0;
  align-self: center;
  &:focus{
    outline: none;
  }
  svg{
    height: 23px;
    &:hover{
      color:#fff;
    }
  }
  @media screen and (min-width: 768px) {
    padding:0;
  }
  &:hover{
    color:#fff;
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
  &:focus{
    outline: none;
  }
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
      width: 23px;
      height: 23px;
      margin-top: 5px;
    }
  }
`;

export default function Header() {
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
            <NavLink href={'/cart'}><CartMaterialUI/></NavLink>
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