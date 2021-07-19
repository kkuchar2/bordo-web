import styled from "styled-components";

export const StyledForgotPasswordPage = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  @media (max-width: 600px) {
    margin-top: 0;
  }

  .wrapperForgotPassword {
    max-width: 1480px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .wrapperEmailSent {
    height: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;