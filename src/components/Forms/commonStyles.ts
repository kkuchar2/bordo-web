import {Link, LinkProps} from "react-router-dom";
import styled from "styled-components";

export const formTitleTheme = {
    textColor: "#FFC046",
    fontSize: "1.2em",
    textAlign: "left",
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

export const errorTextTheme = {
    textColor: "#ff4949",
    fontSize: "15px"
};

export const formFieldTheme = (disabled: boolean) => {
    return {
        backgroundColor: disabled ? "rgba(57,57,57,0.5)" : "#393939",
        autoFillBackgroundColor: disabled ? "rgba(57,57,57,0.5)" : "#393939",
        textColor: "#474747",
        border: "none",
        borderRadius: "4px",
        height: "40px",
        width: "100%",
        padding: "10px",
        caretColor: "#646464",

        titleTextTheme: {
            textColor: disabled ? 'rgba(241,241,241,0.4)' : '#F1F1F1',
            fontSize: '0.9em',
            fontWeight: 600,
            textAlign: 'left',
            margin: "20px 0px 10px 0px"
        },

        inputTextTheme: {
            textColor: disabled ? 'rgba(241,241,241,0.4)' : '#F1F1F1',
            fontSize: '0.9em',
            fontWeight: 600,
            textAlign: 'left',
            margin: "0px 0px 0px 0px"
        },

        placeholderTextTheme: {
            textColor: '#727272',
            fontSize: '1.1em',
            textAlign: 'left',
            fontWeight: 600
        }
    };
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
  color: ${props => props.disabled ? "rgba(0,137,88,0.4)" : "#008958"};
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

export const StyledRawForm = styled.form<StyledFormProps>`
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    width: 320px;
    position: relative;
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

export const StyledForm = styled.form<StyledFormProps>`
  border-radius: 6px;
  background: #323232;
  display: flex;
  flex-direction: column;
  padding: 30px 30px 30px;
  
  @media (min-width: 600px) {
    width: 320px;
    position: relative;
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 0;
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