import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import styled from "styled-components";

export const signUpTextTheme = {
    textColor: "#bbbbbb",
    fontSize: "25px"
};

export const createNewAccountTextTheme = {
    textColor: "#bbbbbb",
    fontSize: "15px"
};

export const signInTextTheme = {
    textColor: "#bbbbbb",
    fontSize: "15px"
};

export const errorTextTheme = {
    textColor: "#ff4949",
    fontSize: "15px"
};

export const buttonTheme = {
    width: "200px",
    height: "40px",
    background: "#573bbb",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "#435ec6",
    border: "none",
    borderRadius: "50px",

    text: {
        fontSize: "14px",
        textColor: "#ffffff",
        disabledTextColor: "rgba(255,255,255,0.20)"
    }
};

export const spinnerTheme = {
    color: "#9333ff",
    disabledColor: "rgba(255,119,0,0.29)",

    text: {
        textColor: "#e5e5e5",
        disabledTextColor: "rgba(255,255,255,0.20)"
    }
};

export const StyledLink = styled(Link)`
  color: #cbcbcb;
  position: relative;

  &:hover {
    color: #00a6ff;
  }
`;

export const StyledJustRemembered = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

export const StyledButtonGroup = styled.div`
  margin-top: 20px;
  justify-content: center;
  display: flex;
  align-items: center;
  height: 50px;
`;

export const StyledUnknownError = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

export const StyledRegistrationFormComponent = styled(motion.div)`
  border-radius: 6px;
  background: #323232;
  box-shadow: 20px 20px 20px 0 rgba(0, 0, 0, .4);

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
      font-weight: 300;
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

    .errorWrapper {
      margin-top: 10px;
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

      .errorIcon {
        color: rgb(186, 47, 47);
      }

      .errorText {
        margin-left: 10px;
        font-size: 16px;
        color: rgb(186, 47, 47);
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
        font-family: "Whitney Medium", sans-serif;
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