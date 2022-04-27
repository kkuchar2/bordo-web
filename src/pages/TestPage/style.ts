import styled from "styled-components";

export const StyledTestPage = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const StyledTestPageContent = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  height: 100%;
  color: white;
  font-size: 1em;
  padding: 20px;
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
  
  button {
    width: 200px;
    height: 40px;
    margin-top: 10px;
  }
`;