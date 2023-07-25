import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  th{
    text-align: left;
    text-transform: uppercase;
    color: #ccc;
    font-weight: 600;
    font-size: .7rem;
  }
  @media screen and (max-width: 768px) {
    th:nth-child(2) {
      margin-right: 10px;
    }
  }
  td{
    border-top: 1px solid rgba(0,0,0,0.1);
  }
`;
export default function Table(props){ 
  return <StyledTable {...props}/> 
}