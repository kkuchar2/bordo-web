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
    width: "200px",
    height: 50,
    boxShadow: "0px 9px 15px 0 rgba(0, 0, 0, 0.12)",
    border: '1px solid #D1D1D1',
    backgroundColor: '#ffffff',
    placeholderTextColor: '#6E6893',
    selectedSingleValueTextColor: '#2b2b2b',
    arrowColor: '#858585',
    arrowColorHover: '#5d5959',
    indicatorSeparatorColor: '#afafaf',
    borderRadius: 4,
    listBorderRadius: 4,
    listBackgroundColor: '#ffffff',
    listItemTextColor: "#6E6893",
    listItemSelectedTextColor: "#ffffff",
    itemHoverBackgroundColor: 'rgb(73, 119, 200)',
    itemSelectedBackgroundColor: 'rgb(109,144,211)',
    itemHoverTextColor: '#ffffff',
    listItemHeight: 50
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