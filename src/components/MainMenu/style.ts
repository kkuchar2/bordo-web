import styled from "styled-components";

export const StyledMainMenu = styled.div`
  color: #c4c4c4;
  height: 100%;
  background: #2e2e2e;
  padding: 15px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-end;
  
  @media (max-width: 1200px) {
    width: 100%;
    height: unset;
    padding: 10px;
  }
`;

export const StyledMenuItems = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  
  @media (max-width: 1200px) {
    flex-direction: row;
    gap: 10px;
  }
`;

export const StyledMenuGroupTitle = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
`;
