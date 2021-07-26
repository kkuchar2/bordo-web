import styled from "styled-components";
import {motion} from "framer-motion";

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
  align-items: center;
  justify-content: center;
`;

export const PropertyValueSection = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
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
    fontSize: "15px"
};

export const propertyValueTheme = {
    textColor: "#bbbbbb",
    fontSize: "15px"
};

export const editButtonTheme = {
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

export const saveButtonTheme = {
    width: "90px",
    height: "30px",
    background: "#760000",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "#890e0e",
    border: "none",
    borderRadius: "6px",

    text: {
        fontSize: "14px",
        textColor: "#ffffff",
        disabledTextColor: "rgba(255,255,255,0.20)"
    }
};