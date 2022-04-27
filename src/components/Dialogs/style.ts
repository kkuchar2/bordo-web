import styled from "styled-components";

export const StyledDialogs = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(14, 14, 14, 0.75);
  position: absolute;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const StyledDialog = styled.div`
  background: #323232;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  position: relative;

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
  padding: 20px;
  width: 100%;
  background: #242424;
  box-sizing: border-box;
  
  .cancel {
    background: red;
  }
`;

export const StyledButtonPendingOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;