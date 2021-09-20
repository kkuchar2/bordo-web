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
    textColor: "#666666",
    fontSize: "0.9em"
};

export const propertyValueTheme = {
    textColor: "#6b6b6b",
    fontSize: "0.9em"
};

export const editButtonTheme = {
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

export const editInputTheme = {
    backgroundColor: "rgba(255,255,255,0)",
    textColor: "#474747",
    placeholderTextColor: "#dbdbdb",
    border: "1px solid " + "#afafaf",
    borderFocus: "1px solid " + "#0088ff",
    borderRadius: "0",
    height: "40px",
    width: "280px",
    margin: "0px 0px 0px 0px",

    textTheme: {
        fontWeight: "300",
        textColor: '#868686',
        fontSize: '1em'
    }
};
