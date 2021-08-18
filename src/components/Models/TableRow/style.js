import styled from "styled-components";

export const StyledCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
  
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const StyledTableRow = styled.div`
  display: flex;
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 10px;
  background: #eeeeee;
  width: calc(100% - 40px);
  position: relative;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

export const booleanSelectTheme = {
    width: "100px",
    height: "40px",
    border: 'none',
    borderRadius: '8px',
    textColor: '#ffffff',
    disabledTextColor: '#959595',
    backgroundColor: "rgba(0,180,105,1)",
    disabledBackgroundColor: '#dcdcdc',
    hoverBackgroundColor: "rgb(0,159,91)",
    iconColor: "#ffffff",
    disabledIconColor: "#959595",
    fontSize: "0.9em",

    listStyle: {
        background: "#ffffff",
        listItemStyle: {
            textColor: "#2d2d2d",
            textColorHover: "#ffffff",
            disabledTextColor: "#9c9c9c",
            background: "#ffffff",
            disabledBackground: "#e5e5e5",
            backgroundHover: "rgba(0,180,105,1)",
            paddingLeft: "15px",
            paddingRight: "15px"
        }
    }
};

export const editRowButtonTheme = {
    width: "40px",
    height: "40px",
    background: "rgba(0,180,105,1)",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "rgb(0,141,83)",
    border: "none",
    borderRadius: "6px",
    margin: "0px 0px 0px 10px",

    text: {
        textAlign: "center",
        fontSize: "14px",
        textColor: "#ffffff",
        fontWeight: "700",
        disabledTextColor: "rgba(255,255,255,0.20)"
    }
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