import styled from "styled-components";

export const titleTextTheme = {
    textColor: "#323232",
    fontSize: "0.9em",
    textAlign: "left",
    fontWeight: 500
};

export const StyledFieldRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    
    > div {
      width: 100%;
      
      > * {
        width: 100%;
      }
    }
  }
`;
