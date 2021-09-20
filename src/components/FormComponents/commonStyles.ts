import {Link} from "react-router-dom";
import styled from "styled-components";

export const formTitleTheme = {
    textColor: "#5B92FC",

    fontSize: "1.5em",
    textAlign: "center",
    fontWeight: 400,
    margin: "0px 0px 10px 0px"
};

export const questionTextTheme = {
    textColor: "#6F6F6F",
    fontWeight: 500,
    fontSize: "1.0em"
};

export const errorTextTheme = {
    textColor: "#ff4949",
    fontSize: "15px"
};

export const buttonTheme = {
    width: "230px",
    height: "50px",
    background: "#5B92FC",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "#5080de",
    border: "none",
    borderRadius: "10px",
    margin: "20px 0px 0px 0px",

    text: {
        fontSize: "1.1em",
        textColor: "#ffffff",
        lineHeight: "50px",
        disabledTextColor: "rgba(255,255,255,0.20)",
        textAlign: "center",
        fontWeight: 500
    }
};

export const StyledQuestionWithLinkTheme = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 10px;
  height: 20px;
`;

export const StyledButtonGroup = styled.div`
  margin-top: 30px;
  margin-bottom: 0px;
  justify-content: center;
  display: flex;
  align-items: center;
  height: 50px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #5B92FC;
  font-size: 1.0em;

  &:hover {
    text-decoration: underline;
  }
`;

export const spinnerTheme = {
    color: "#5B92FC",
    disabledColor: "rgba(255,119,0,0.29)",

    text: {
        textColor: "#505050",
        disabledTextColor: "rgba(255,255,255,0.20)",
        fontSize: "1.1em"
    }
};