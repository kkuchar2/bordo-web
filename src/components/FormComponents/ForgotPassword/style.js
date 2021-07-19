import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import styled from "styled-components";

export const StyledForgotPasswordForm = styled(motion.div)`
  border-radius: 6px;
  background: #323232;
  box-shadow: 20px 20px 20px 0 rgba(0,0,0,.4);
  
  @media (max-width: 600px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-left: 10px;
    margin-right: 10px;
  }

  .form {
    border-radius: 6px;
    background: #323232;
    display: flex;
    flex-direction: column;
    padding: 30px 30px 30px;

    @media (min-width: 600px) {
      width: 350px;
      position: relative;
    }

    @media (max-width: 600px) {
      width: 100%;
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

    .buttonGroup {
      width: 100%;
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const buttonTheme = {
    width: "230px",
    height: "40px",
    background: "#d7084b",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "#ee1960",
    border: "none",
    borderRadius: "50px",

    text: {
        fontSize: "14px",
        textColor: "#ffffff",
        disabledTextColor: "rgba(255,255,255,0.20)"
    }
};

export const titleTextTheme = {
    textColor: "#bbbbbb",
    fontSize: "25px"
};

export const descriptionTextTheme = {
    textColor: "#bbbbbb",
    fontSize: "15px"
};

export const justRememberedTextTheme = {
    textColor: "#bbbbbb",
    fontSize: "15px"
};

export const StyledLink = styled(Link)`
  color: #cbcbcb;
  position: relative;
  margin-left: 10px;
  margin-bottom: 2px;
  
  &:hover {
    color: #00a6ff;
  }
`;

export const StyledJustRemembered = styled.div`
    display: flex;
    align-items: center;
    margin-top: 30px;
`;