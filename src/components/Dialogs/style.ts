import styled from "styled-components";

export const StyledDialogs = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(49, 49, 49, 0.75);
  position: absolute;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const StyledDialog = styled.div`
  background: #282828;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 20px;

  @media (max-width: 600px) {
    width: 100%;
    height: 100%;
    max-height: 100%;
    max-width: 100%;
    border-radius: 0;
    box-shadow: none;
  }
`;

export const StyledDialogButtonsSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
`;