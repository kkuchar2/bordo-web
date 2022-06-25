import styled from "styled-components";

export const StyledCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 20px;
  box-sizing: border-box;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

interface StyledTableRowProps {
    inEditMode: boolean
}

export const StyledTableRow = styled.div<StyledTableRowProps>`
  display: flex;
  padding-right: 10px;
  width: 100%;
  min-height: 50px;
  box-sizing: border-box;
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  background: rgba(33, 33, 33, 0.35);
  outline: ${props => props.inEditMode ? '2px dashed ' + '#5d5d5d' : 'transparent'};
  border-bottom: none;
  z-index: ${props => props.inEditMode ? 30 : 1};

  @media (max-width: 1200px) {
    flex-direction: column;
  }

  &:hover {
    cursor: pointer;
    background: ${props => props.inEditMode ? 'rgba(33, 33, 33, 0.35)' : 'rgba(19,19,19,0.35)'};
  }
`;

export const booleanSelectTheme = {
    width: "150px",
    height: 35,

    // List
    listBorderRadius: 14,
    listBackgroundColor: '#1a1a1a',

    // List item
    itemHeight: 50,
    itemTextColor: "#d3d3d3",
    itemSelectedTextColor: "#dcdcdc",
    itemHoverBackgroundColor: '#414141',
    itemSelectedBackgroundColor: '#5865F2',
    itemHoverTextColor: '#dcdcdc',
    itemFontSize: '0.9em',
    itemFontWeight: 600,

    // Selected value
    selectedValueTextColor: '#d3d3d3',
    selectedValueFontWeight: 600,
    selectedValueFontSize: '0.9em',

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
    placeholderFontWeight: 500,

    // Other
    border: 'none',
    backgroundColor: '#1a1a1a',
    backgroundColorDisabled: 'rgba(47,47,47,0.42)',
    borderRadius: 7,
    menuBorderRadius: 7,
    optionBorderRadius: 4,
    boxShadow: "0 9px 15px 0 rgba(0, 0, 0, 0.12)",
    cursorOnHover: 'pointer'
};

export const saveButtonTheme = {
    width: "110px",
    height: "35px",
    background: "#4A4AFF",
    disabledBackground: "rgba(213,213,213,0.43)",
    hoverBackground: "#544993",
    border: "none",
    borderRadius: "4px"
};

export const deleteButtonTheme = {
    width: "32px",
    height: "32px",
    background: "#c03838",
    disabledBackground: "rgba(213,213,213,0.43)",
    hoverBackground: "#c03333",
    border: "none",
    borderRadius: "4px",
    margin: "0px 0px 0px 10px"
};

export const saveButtonTextTheme = {
    textColor: "#ffffff",
    fontSize: "1em",
    fontWeight: 600
};

export const spinnerTheme = {
    color: "rgb(255,255,255)",
    disabledColor: "rgba(255,119,0,0.29)",
    margin: "0px 0px 0px 0px",

    text: {
        textColor: "#505050",
        disabledTextColor: "rgba(255,255,255,0.20)",
        fontSize: "1.1em"
    }
};