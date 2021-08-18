import styled from "styled-components";

export const StyledPasswordChangeForm = styled.div`
  width: 100%;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  border-radius: 10px;
`;

export const StyledSaveSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const inputTheme = {
    backgroundColor: "rgba(255,255,255,0)",
    textColor: "#2f2f2f",
    placeholderTextColor: "#c5c5c5",
    border: "1px solid " + "#afafaf",
    borderFocus: "1px solid " + "#0088ff",
    borderRadius: "0",
    height: "40px",
    width: "100%",
    margin: "0px 0px 30px 0px",

    textTheme: {
        textColor: '#545454',
        fontSize: '1em',
        fontWeight: "500"
    }
};

export const saveButtonTheme = {
    width: "100px",
    height: "35px",
    background: "rgba(0,180,105,1)",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "rgb(0,140,81)",
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

export const cancelButtonTheme = {
    width: "100px",
    height: "35px",
    background: "rgba(0,180,105,1)",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "rgb(0,140,81)",
    border: "none",
    borderRadius: "6px",

    text: {
        textAlign: "center",
        fontSize: "14px",
        textColor: "#ffffff",
        fontWeight: "700",
        disabledTextColor: "rgba(255,255,255,0.20)"
    }
};