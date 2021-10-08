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
  margin-top: 10px;
  padding-right: 10px;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  position: relative;
  background: #ffffff;
  outline: ${props => props.inEditMode ? '3px dashed ' + '#9a91d0' : 'transparent'};
  border-bottom: ${props => {
      if (!props.inEditMode) {
          return "2px solid " + "#ebe9ff";
      }
      return "none";
  }};
  
  @media (max-width: 1200px) {
    flex-direction: column;
  }
  
  &:hover {
    cursor: pointer;
    background: ${props => props.inEditMode ? '#ffffff' : '#F2F0F9'};
  }
`;

export const booleanSelectTheme = {
    // Size
    width: "200px",
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

export const saveButtonTheme = {
    width: "120px",
    height: "40px",
    background: "#6358a4",
    disabledBackground: "rgba(213,213,213,0.43)",
    hoverBackground: "#544993",
    border: "none",
    borderRadius: "50px"
};

export const deleteButtonTheme = {
    width: "40px",
    height: "40px",
    background: "#e74545",
    disabledBackground: "rgba(213,213,213,0.43)",
    hoverBackground: "#c03333",
    border: "none",
    borderRadius: "8px",
    margin: "0px 0px 0px 10px"
};

export const saveButtonTextTheme = {
    textColor: "#ffffff",
    fontSize: "1.1em",
    fontWeight: 400
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