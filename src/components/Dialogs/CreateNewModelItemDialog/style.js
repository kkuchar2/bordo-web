import styled from "styled-components";

export const StyledCreateNewModelItemDialog = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const titleTextTheme = {
    textColor: "#ffffff",
    fontSize: "1.2em",
    textAlign: "center"
};

export const StyledDialogTitleSection = styled.div`
  background: rgba(0,180,105,1);
  padding: 20px;
`;

export const StyledDialogContentSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const StyledDialogButtonsSection = styled.div`
  //background: blue;
  flex: 1 0;
  align-items: flex-end;
  justify-content: flex-end;
  display: flex;
  padding: 20px;
`;

export const cancelButtonTheme = {
    width: "120px",
    height: "40px",
    background: "rgba(229,229,229,0.68)",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "rgba(238,238,238,0.68)",
    border: "none",
    borderRadius: "6px",

    text: {
        textAlign: "center",
        fontSize: "14px",
        textColor: "#565656",
        fontWeight: "700",
        disabledTextColor: "rgba(255,255,255,0.20)",
    }
};

export const confirmButtonTheme = {
    width: "120px",
    height: "40px",
    background: "rgba(0,180,105,1)",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "rgb(0,141,83)",
    border: "none",
    borderRadius: "6px",
    margin: "0px 0px 0px 10px",

    text: {
        textAlign: "center",
        fontSize: "14px",
        textColor: "#ffffff",
        fontWeight: "700",
        disabledTextColor: "rgba(255,255,255,0.20)"
    }
};

