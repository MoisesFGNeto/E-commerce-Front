import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color:#222;
  height: 45px;
  width: 100%;
  display: flex;
  align-items: center;
  bottom: 0;
  position: fixed;
`;

const RightsStyled = styled.p`
  padding: 10px;
  color: #aaa;
  font-size: 12px;
  font-weight: 300;
  `;

export default function Footer() {
  return(
      <>
      <StyledFooter>
        <RightsStyled>2023 Developed by Moisés. All rights reserved.</RightsStyled>
      </StyledFooter>
      </>
  )
}