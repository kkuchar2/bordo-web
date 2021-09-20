import styled from "styled-components";

export const titleTextTheme = {
    textColor: "#252525",
    fontSize: "1.2em",
    textAlign: "center"
};

export const descriptionTextTheme = {
    textColor: "#333333",
    fontSize: "15px",
};

export const StyledRegistrationCompleteDialog = styled.div`
  max-width: 500px;
  width: 450px;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

export const StyledDialogTitleSection = styled.div`
  padding: 20px;
`;

export const StyledDialogDescriptionSection = styled.div`
  padding: 20px;
`;

export const StyledDialogButtonsSection = styled.div`
  flex: 1 0;
  align-items: flex-end;
  justify-content: flex-end;
  display: flex;
  padding: 20px;
`;

export const goHomeButtonTheme = {
    width: "120px",
    height: "40px",
    background: "rgba(255,255,255,0.68)",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "rgba(238,238,238,0.68)",
    border: "none",
    borderRadius: "6px",
    margin: "0px 0px 0px 10px",

    text: {
        textAlign: "center",
        fontSize: "14px",
        textColor: "#565656",
        fontWeight: "700",
        disabledTextColor: "rgba(255,255,255,0.20)",
    }
};