import AddIcon from '@material-ui/icons/Add';
import ImportExportIcon from '@material-ui/icons/ImportExport';
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

export const StyledPlusIcon = styled(AddIcon)`
    color: white;
    margin-left: 5px;
`;

export const StyledImportIcon = styled(ImportExportIcon)`
    color: white;
    margin-left: 5px;
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

export const addItemButtonTheme = {
    width: "180px",
    height: "40px",
    background: "#5865F2",
    disabledBackground: "rgba(213,213,213,0.43)",
    hoverBackground: "#4752C4",
    border: "none",
    borderRadius: "5px",
    margin: "0px 0px 0px 10px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
};

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

export const addRowTextTheme = {
    fontSize: "1em",
    textColor: "#ffffff",
    disabledTextColor: "rgba(255,255,255,0.20)",
    fontWeight: 600,
    margin: "2px 0px 0px 10px"
};
