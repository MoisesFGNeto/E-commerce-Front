import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 5px;

  margin: 5px 0 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

export default function Input(props){
  return <StyledInput {...props}/>
}