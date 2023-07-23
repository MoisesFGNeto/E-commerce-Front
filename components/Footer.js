import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color:#222;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  bottom: 0;
`;

const RightsStyled = styled.p`
  padding: 10px;
  color: #aaa;
  font-size: 12px;
  font-weight: 300;
  `;

export default function Footer() {
  return(
      <footer>
        <StyledFooter>
          <RightsStyled>2023 Developed by Moisés. All rights reserved.</RightsStyled>
        </StyledFooter>
      </footer>
  )
}