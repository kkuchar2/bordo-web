import {motion} from "framer-motion";
import styled from "styled-components";

export const StyledModelsView = styled(motion.div)`
  flex: 1 0;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  box-sizing: border-box;
`;

export const StyledToolbar = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;


  @media (max-width: 1200px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const modelSelectorTheme = (isMobile: boolean) => {
    return {

        // Size
        width: isMobile ? "100%" : "450px",
        height: 50,

        // List
        listBorderRadius: 14,
        listBackgroundColor: '#1a1a1a',

        // List item
        itemHeight: 50,
        itemTextColor: "#dcdcdc",
        itemSelectedTextColor: "#dcdcdc",
        itemHoverBackgroundColor: '#414141',
        itemSelectedBackgroundColor: '#5865F2',
        itemHoverTextColor: '#dcdcdc',
        itemFontSize: '0.9em',
        itemFontWeight: 400,

        // Selected value
        selectedValueTextColor: '#c0c0c0',
        selectedValueFontWeight: 600,
        selectedValueFontSize: '0.8em',

        // Arrow
        arrowColor: '#c0c0c0',
        arrowColorHover: '#c0c0c0',
        arrowColorDisabled: 'rgba(192,192,192,0.33)',

        // Separator line
        indicatorSeparatorColor: '#afafaf',
        indicatorSeparatorDisplay: 'none',

        // Placeholder
        placeholderTextColor: '#c0c0c0',
        placeholderTextColorDisabled: 'rgba(192,192,192,0.25)',
        placeholderFontSize: '1em',
        placeholderFontWeight: 600,

        // Other
        border: 'none',
        backgroundColor: '#2a2a2a',
        backgroundColorDisabled: 'rgba(47,47,47,0.42)',
        borderRadius: 7,
        menuBorderRadius: 7,
        optionBorderRadius: 4,
        boxShadow: "0 9px 15px 0 rgba(0, 0, 0, 0.12)",
        cursorOnHover: 'pointer'
    };
};