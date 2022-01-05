import styled from "styled-components";

export const titleTextTheme = {
    textColor: "#FFC046",
    fontSize: "1.2em",
    textAlign: "left",
    fontWeight: 600
};

export const descriptionTextTheme = {
    textColor: "#bdbdbd",
    fontSize: "15px",
    textAlign: "left",
    fontWeight: 600
};

export const cancelButtonTheme = {
    width: "120px",
    height: "40px",
    background: "none",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "none",
    border: "none",
    borderRadius: "6px",

    text: {
        textAlign: "center",
        fontSize: "14px",
        textColor: "#ffffff",
        fontWeight: "700",
        disabledTextColor: "rgba(255,255,255,0.20)",
    }
};

export const confirmButtonTheme = {
    width: "120px",
    height: "40px",
    background: "#4A4AFF",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "#4e4eff",
    border: "none",
    borderRadius: "6px",
    margin: "0px 0px 0px 10px",

    text: {
        textAlign: "center",
        fontSize: "14px",
        textColor: "#ffffff",
        fontWeight: "700",
        disabledTextColor: "rgba(255,255,255,0.20)",
    }
};

export const StyledDialogTitleSection = styled.div`
  margin-bottom: 20px;
`;

export const StyledDialogDescriptionSection = styled.div`
  margin-bottom: 20px;
`;