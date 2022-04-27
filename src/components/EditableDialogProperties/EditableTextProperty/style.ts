import styled from "styled-components";

export const StyledEditableTextProperty = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledPropertyValues = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PropertyValueSection = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
`;

export const PropertyEditSection = styled.div`
  flex: 1 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const propertyNameTheme = {
    textColor: "#b9b9b9",
    fontSize: "1.0em",
    fontWeight: 700
};

export const propertyValueTheme = {
    textColor: "#b9b9b9",
    fontSize: "0.9em",
    fontWeight: 600
};

export const editButtonTheme = {
    width: "120px",
    height: "40px",
    background: "#6363ff",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "#4e4eff",
    border: "none",
    borderRadius: "6px",
    margin: "0px 0px 0px 10px",

    text: {
        textAlign: "center",
        fontSize: "14px",
        textColor: "#e1e1e1",
        fontWeight: "700",
        disabledTextColor: "rgba(255,255,255,0.20)",
    }
};