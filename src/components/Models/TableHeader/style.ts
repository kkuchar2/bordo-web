import styled from "styled-components";

export const StyledTableHeader = styled.div`
  display: flex;
  background: #F4F2FF;
  height: 65px;
  box-sizing: border-box;
  align-items: center;
  margin-left: 3px;
  margin-right: 3px;
  
  @media (max-width: 800px) {
    display: none;
  }

  > div {
    box-sizing: border-box;
    text-align: left;
  }
`;

export const headerTextTheme = {
    textColor: '#6E6893',
    fontSize: '1.0em',
    fontWeight: 500,
    margin: '0px 0px 0px 20px'
};