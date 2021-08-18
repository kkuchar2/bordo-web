import styled from "styled-components";

export const StyledTableHeader = styled.div`
  display: flex;
  background: #e5e5e5;
  padding: 10px 20px;
  border-radius: 10px;

  @media (max-width: 800px) {
    display: none;
  }

  > div {
    box-sizing: border-box;
    text-align: left;
  }
`;

export const headerTextTheme = {
    textColor: '#505050',
    fontSize: '1.0em',
    fontWeight: 500,
    margin: '0px 0px 0px 10px'
};