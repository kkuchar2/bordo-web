import styled from "styled-components";

export const StyledUnverifiedAccount = styled.div`
  background: #933d00;
  margin-bottom: 20px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 20px;
`;

export const StyledMessageWrapper = styled.div`

`;

export const resendButtonTheme = {
    width: "auto",
    height: "40px",
    background: "#ffffff",
    disabledBackground: "rgba(255,255,255,0.43)",
    hoverBackground: "#ffffff",
    border: "none",
    borderRadius: "3px",
    margin: "20px 0px 20px 0px",

    text: {
        textAlign: "center",
        fontSize: "0.9em",
        textColor: "#E09516",
        fontWeight: "600",
        margin: "0px 10px 0px 10px",
        disabledTextColor: "rgba(255,255,255,0.20)",
    }
};

export const titleTheme = {
    textColor: "#ffffff",
    fontSize: "0.9em",
    fontWeight: 600,
    margin: "20px 0px 0px 0px "
};

export const messageTheme = {
    textColor: "#ffffff",
    fontSize: "0.8em",
    fontWeight: 500,
};