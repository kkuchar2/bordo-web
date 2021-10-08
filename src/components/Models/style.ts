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
export const importCSVButtonTheme = {
    width: "200px",
    height: "50px",
    background: "#6256a6",
    disabledBackground: "rgba(213,213,213,0.43)",
    hoverBackground: "#5e549b",
    border: "none",
    borderRadius: "5px",
    margin: "0px 0px 0px 10px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
};

export const addItemButtonTheme = {
    width: "200px",
    height: "50px",
    background: "#4977C8",
    disabledBackground: "rgba(213,213,213,0.43)",
    hoverBackground: "rgb(73, 119, 200)",
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
        width: isMobile ? "100%" : "330px",
        height: 50,

        // List
        listBorderRadius: 14,
        listBackgroundColor: '#ffffff',

        // List item
        itemHeight: 50,
        itemTextColor: "#343434",
        itemSelectedTextColor: "#000000",
        itemHoverBackgroundColor: '#d0d0d0',
        itemSelectedBackgroundColor: '#e3e3e3',
        itemHoverTextColor:  '#000000',
        itemFontSize: '0.9em',
        itemFontWeight: 600,

        // Selected value
        selectedValueTextColor: '#2b2b2b',
        selectedValueFontWeight: 600,
        selectedValueFontSize: '1em',

        // Arrow
        arrowColor: '#5d5959',
        arrowColorHover: '#5d5959',

        // Separator line
        indicatorSeparatorColor: '#afafaf',
        indicatorSeparatorDisplay: 'none',

        // Placeholder
        placeholderTextColor: '#3a3a3a',
        placeholderFontSize: '1.1em',
        placeholderFontWeight: 600,

        // Other
        border: '1px solid ' + '#eaeaea',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        boxShadow: "0 9px 15px 0 rgba(0, 0, 0, 0.12)",
        cursorOnHover: 'pointer'
    };
};

export const addRowTextTheme = {
    fontSize: "1em",
    textColor: "#ffffff",
    disabledTextColor: "rgba(255,255,255,0.20)",
    fontWeight: 500,
    margin: "0px 0px 0px 10px"
};
