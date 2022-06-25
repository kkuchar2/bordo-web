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
    fontSize: "0.7em",
    fontWeight: 600
};

export const propertyValueTheme = {
    textColor: "#dcdcdc",
    fontSize: "0.9em",
    fontWeight: 500
};