import styled from "styled-components";

export const StyledTableHeader = styled.div`
  display: flex;
  background: #1f1f1f;
  height: 65px;
  box-sizing: border-box;
  align-items: center;
  margin-left: 3px;
  margin-right: 3px;
  border-radius: 6px;
  
  @media (max-width: 800px) {
    display: none;
  }

  > div {
    box-sizing: border-box;
    text-align: left;
  }
`;

export const headerTextTheme = {
    textColor: '#c5c5c5',
    fontSize: '0.8em',
    fontWeight: 600,
    margin: '0px 0px 0px 0px'
};