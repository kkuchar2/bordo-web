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
    fontSize: "1.05em",
    fontWeight: 500
};

export const propertyValueTheme = {
    textColor: "#b9b9b9",
    fontSize: "0.9em",
    fontWeight: 500
};

export const editButtonTheme = {
    width: "100px",
    height: "34px",
    background: "#4f545c",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "#686D73",
    border: "none",
    borderRadius: "3px",
    margin: "0px 0px 0px 10px",

    text: {
        textAlign: "center",
        fontSize: "14px",
        textColor: "#e1e1e1",
        fontWeight: "500",
        disabledTextColor: "rgba(255,255,255,0.20)",
    }
};

export const editInputTheme = {
    backgroundColor: "#1a1a1a",
    textColor: "#474747",
    border: "none",
    borderFocus: "none",
    borderRadius: "4px",
    height: "40px",
    width: "100%",
    padding: "10px",
    caretColor: "#646464",

    titleTextTheme: {
        textColor: '#b2b2b2',
        fontSize: '0.9em',
        fontWeight: '600',
        textAlign: 'left',
        margin: "0px 0px 10px 0px"
    },

    inputTextTheme: {
        textColor: '#bebebe',
        fontSize: '0.9em',
        fontWeight: '600',
        textAlign: 'left',
        margin: "0px 0px 0px 0px"
    },

    placeholderTextTheme: {
        textColor: '#696969',
        fontSize: '0.9em',
        textAlign: 'left',
        fontWeight: '600'
    }
};
