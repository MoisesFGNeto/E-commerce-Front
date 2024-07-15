import styled from 'styled-components';

const StyledTabs = styled.div`
display: flex;
gap: 20px;
margin-bottom: 20px;
`;

const StyledTab = styled.span`
  font-size: 1.5em;
  cursor: pointer;
  ${props => props.active ? `
  color: black;
  border-bottom: ${props => props.active === "true" ? "2px solid black" : "none"};
  ` : `
  color: #aaa;
  `}
`;

export default function Tabs({tabs,active,onChange}) {
  return (
    <StyledTabs>
      {tabs.map(tabName => (
        <StyledTab 
          key={tabName}
          onClick={() => {onChange(tabName)}}
          active={tabName === active}>
          {tabName}
        </StyledTab>
      ))}
    </StyledTabs>
  );
}