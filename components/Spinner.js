import { BeatLoader } from "react-spinners";
import styled from "styled-components";

const Wrapper = styled.div`
  ${props => props.fullwidth ? `
  display: block; 
  display: flex;
  justify-content: center;
  margin-top: 50px;
  `: `
  border:1px solid transparent;
  `}
`;

export default function Spinner({fullwidth}) {
  return (
    <Wrapper fullwidth={fullwidth}>
      <BeatLoader speedMultiplier={0.6} color={'#666'} size={30} margin={5}/>
    </Wrapper>
  );
}