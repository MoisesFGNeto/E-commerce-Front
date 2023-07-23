import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const StyledFooter = styled.footer`
  background-color:#222;
  height: 50px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
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