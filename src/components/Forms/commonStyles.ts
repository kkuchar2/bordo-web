import {Link, LinkProps} from "react-router-dom";
import styled from "styled-components";

export const formTitleTheme = {
    textColor: "#dcdcdc",
    fontSize: "1.2em",
    textAlign: "center",
    fontWeight: 600,
    margin: "0px 0px 10px 0px"
};

export const questionTextTheme = {
    textColor: "#d2d2d2",
    disabledTextColor: "rgba(210,210,210,0.4)",
    fontWeight: 500,
    fontSize: "1.0em",
    margin: "0px 20px 0px 0px"
};

export const buttonTheme = {
    width: "230px",
    height: "50px",
    background: "#454545",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "#565656",
    border: "none",
    borderRadius: "10px",
    margin: "20px 0px 0px 0px",

    text: {
        fontSize: "1.1em",
        textColor: "#ffffff",
        lineHeight: "50px",
        disabledTextColor: "rgba(255,255,255,0.20)",
        textAlign: "center",
        fontWeight: 600
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

export interface StyledLinkProps {
    marginTop?: number,
    marginRight?: number,
    marginBottom?: number,
    marginLeft?: number,
    disabled?: boolean
}

export interface StyledFormProps {

}

export const StyledLink = styled(Link)<LinkProps & StyledLinkProps>`
  text-decoration: none;
  color: ${props => props.disabled ? "rgba(0,137,88,0.4)" : "#51e320"};
  font-size: 1.0em;
  font-weight: 600;
  margin-top: ${props => `${props.marginTop}px`};
  margin-right: ${props => `${props.marginRight}px`};
  margin-bottom: ${props => `${props.marginBottom}px`};
  margin-left: ${props => `${props.marginLeft}px`};


  &[disabled] {
    pointer-events: none;
  }

  &:hover {
    text-decoration: ${props => props.disabled ? 'none' : 'underline'};
  }
`;

export const StyledCenteredSection = styled.div`
  @media (max-width: 600px) {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: flex-end;
  }

  @media (min-width: 600px) {
    height: 600px;
  }
`;

export const StyledForm = styled.form<StyledFormProps>`
  border-radius: 6px;
  background: #323232;
  display: flex;
  flex-direction: column;
  padding: 30px 30px 30px;
  box-sizing: border-box;

  @media (min-width: 600px) {
    width: 480px;
    position: relative;
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    border-radius: 0;
    transform: scale(0.9);
  }
`;

export const spinnerTheme = {
    color: "#5860ff",
    disabledColor: "rgba(88,96,255,0.31)",

    text: {
        textColor: "#d3d3d3",
        disabledTextColor: "rgba(255,255,255,0.20)",
        fontSize: "1em",
        fontWeight: 600,
        margin: "0px 10px 0px 0px"
    }
};