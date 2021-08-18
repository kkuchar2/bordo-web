import {motion} from "framer-motion";
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

export const StyledEditedProperty = styled(motion.div)`
  width: 100%;
  display: flex;

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
    textColor: "#666666",
    fontSize: "0.9em"
};

export const propertyValueTheme = {
    textColor: "#6b6b6b",
    fontSize: "0.5em"
};