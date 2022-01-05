import styled from "styled-components";

export const titleTextTheme = {
    textColor: "#ababab",
    fontSize: "1em",
    textAlign: "left",
    fontWeight: 600,
    margin: "0px 0px 10px 0px"
};

export const StyledFieldRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  padding-left: 10px;
  box-sizing: border-box;
  
  @media (max-width: 600px) {
    align-items: flex-start;
    
    > div {
      width: 100%;
      
      > * {
        width: 100%;
      }
    }
  }
`;
