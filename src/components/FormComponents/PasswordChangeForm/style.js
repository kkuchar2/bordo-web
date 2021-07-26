import styled from "styled-components";

export const StyledPasswordChangeForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledTitleSection = styled.div`
  
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const titleTheme = {
    textColor: "#bdbdbd",
    fontSize: "15px"
}

export const StyledSaveSection = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const inputTheme = {
    backgroundColor: "#2b2b2b",
    textColor: "#cbcbcb",
    disabledTextColor: "red",
    placeholderTextColor: "#4c4c4c",
    border: "none",
    height: "35px",
    width: "280px",
    borderRadius: "4px"
};

export const saveButtonTheme = {
    width: "90px",
    height: "30px",
    background: "#ad6100",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "#b66b0a",
    border: "none",
    borderRadius: "4px",

    text: {
        fontSize: "14px",
        textColor: "#ffffff",
        disabledTextColor: "rgba(255,255,255,0.20)"
    }
};

export const cancelButtonTheme = {
    width: "90px",
    height: "30px",
    background: "#2b2b34",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "#393945",
    border: "none",
    borderRadius: "6px",

    text: {
        fontSize: "14px",
        textColor: "#ffffff",
        disabledTextColor: "rgba(255,255,255,0.20)"
    }
};