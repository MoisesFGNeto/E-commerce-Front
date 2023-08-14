import styled from 'styled-components';
import GirHubIcon from './icons/GirHubIcon';
import Link from "next/link";
import LinkedinIcon from './icons/LinkedinIcon';


const StyledFooter = styled.footer`
  background-color:#222;
  height: 45px;
  width: 100%;
  bottom: 0;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightsStyled = styled.p`
  padding: 10px;
  color: rgb(238, 238, 238);
  font-size: 12px;
  font-weight: 300;
  @media (max-width: 768px) {
    font-size: 0.6em;
  }
  @media (max-width: 300px) {
    font-size: 0.4em;
  }
  `;

const IconSection = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  `;
const Icon = styled.div`
  background-color:rgb(238, 238, 238);
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 10px;
  align-items: center;
  position: relative;
  font-size: 1.2em;
`;

const StyledLinkGit = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  position: absolute; 
  top: 3px;
  left: 3px;
`;
const StyledLinkedin = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  position: absolute; 
  top: 3px;
  left: 3.5px;
`;

export default function Footer() {
  return(
      <>
      <StyledFooter>
        <RightsStyled>
          © 2023 Developed by Moisés. All rights reserved.
        </RightsStyled>
        <IconSection>
        <Icon> 
            <StyledLinkGit href='https://github.com/MoisesFGNeto'>
              <GirHubIcon />
            </StyledLinkGit>
          </Icon>
          <Icon>
            <StyledLinkedin href='https://www.linkedin.com/in/mois%C3%A9s-f-guedes-neto-b922b9b8/'>
             <LinkedinIcon />
            </StyledLinkedin>
          </Icon>
        </IconSection>
      </StyledFooter>
      </>
  )
}