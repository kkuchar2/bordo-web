import styled from "styled-components";

export const StyledMainMenu = styled.div`
  color: #c4c4c4;
  width: 420px;
  min-width: 300px;
  height: 100%;
  background: #1F1F1F;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    width: 100%;
    height: unset;
    padding: 10px;
  }
`;

export const StyledMenuItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  
  @media (max-width: 600px) {
    flex-direction: row;
  }
`;