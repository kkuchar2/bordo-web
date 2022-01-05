import styled from "styled-components";

export const StyledEditablePasswordProperty = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledPropertyValues = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

export const PropertyValueSection = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
    fontSize: "1em",
    fontWeight: 700
};

export const propertyValueTheme = {
    textColor: "#b9b9b9",
    fontSize: "0.6em",
    fontWeight: 600
};