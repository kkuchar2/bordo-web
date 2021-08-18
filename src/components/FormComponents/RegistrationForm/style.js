import {motion} from "framer-motion";
import styled from "styled-components";

export const StyledUnknownError = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

export const StyledRegistrationFormComponent = styled(motion.div)`
  border-radius: 6px;
  background: #ffffff;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .form {
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    padding: 30px 30px 30px;

    @media (min-width: 600px) {
      width: 320px;
      position: relative;
    }

    @media (max-width: 600px) {
      width: 100%;
    }

    .formTitle {
      font-weight: 600;
      font-size: 24px;
      line-height: 30px;
      color: white;
    }

    .formDescription {
      margin-top: 23px;
      margin-bottom: 20px;
      font-size: 16px;
      color: #aaaaaa;
    }

    .input {
      margin-top: 10px;
      width: 100%;
      background: #242426;

      .inputField {
        background: none;
        color: white;
      }

      &.noError {
        border: none;
        border-radius: 5px;
      }
    }

    .forgotPassword {
      margin-top: 10px;
      color: #4fa5de;
      font-size: 12pt;

      margin-left: 10px;
      text-decoration: none;

      &:hover {
        cursor: pointer;
        color: lighten(#4fa5de, 10%);
      }
    }

    .buttonGroup {
      width: 100%;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .button {
        box-sizing: border-box;
        margin-top: 10px;
        width: 280px;
        height: 50px;
        font-size: 12pt;
        align-items: center;
        justify-content: center;
        display: flex;
        padding: 0;
        border: none;
        border-radius: 5px;
        line-height: 50px;
        background: #404040;
        color: white;

        &:hover {
          background: #4562d4;
        }
      }
    }

    .loginLink {
      margin-top: 20px;
      margin-left: 5px;
      color: #4fa5de;
      font-size: 12pt;
      text-decoration: none;

      &:hover {
        cursor: pointer;
        color: lighten(#4fa5de, 10%);
      }
    }
  }
`;

export class justRememberedTextTheme {
}