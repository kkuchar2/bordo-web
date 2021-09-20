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
        width: isMobile ? "100%" : "330px",
        height: 50,
        boxShadow: "0px 9px 15px 0 rgba(0, 0, 0, 0.12)",
        border: '1px solid #D1D1D1',
        backgroundColor: '#ffffff',
        placeholderTextColor: '#606060',
        selectedSingleValueTextColor: '#2b2b2b',
        arrowColor: '#858585',
        arrowColorHover: '#5d5959',
        indicatorSeparatorColor: '#afafaf',
        borderRadius: 4,
        listBorderRadius: 4,
        listBackgroundColor: '#ffffff',
        listItemTextColor: "#343434",
        listItemSelectedTextColor: "#ffffff",
        itemHoverBackgroundColor: 'rgb(73, 119, 200)',
        itemSelectedBackgroundColor: 'rgb(109,144,211)',
        itemHoverTextColor: '#ffffff',
        listItemHeight: 50
    };
};

export const addRowTextTheme = {
    fontSize: "1em",
    textColor: "#ffffff",
    disabledTextColor: "rgba(255,255,255,0.20)",
    fontWeight: 500,
    margin: "0px 0px 0px 10px"
};
