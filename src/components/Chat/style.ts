import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import styled from "styled-components";

export const StyledChat = styled.div`
  width: 400px;
  height: 500px;
  background: #ffffff;
  z-index: 2;
  position: absolute;
  bottom: 20px;
  right: 150px;
  border-radius: 10px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, .2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export interface IStyledExpandIcon {
    collapsed: boolean;
}

export const StyledExpandIcon = styled(KeyboardArrowDownOutlinedIcon)<IStyledExpandIcon>`
    transform: ${props => props.collapsed ? "rotate(180deg)" : "rotate(0deg)"};
`;

export const CollapsedChat = styled.div`
  width: 400px;
  height: 60px;
  background: #282828;
  z-index: 2;
  position: absolute;
  bottom: 20px;
  right: 150px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  
  &:hover {
    cursor: pointer;
  }
`;

export const StyledChatHeader = styled.div`
  width: 400px;
  height: 50px;
  background: #282828;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  align-items: center;
  padding: 20px;
  justify-content: space-between;
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledChatContent = styled.div`
    height: 400px;
    display: flex;
    align-items: flex-start;
`;

export const headerTextTheme = {
    textColor: "#ffffff",
    fontSize: "1.0em",
    fontWeight: 500,
    textAlign: "left"
};

export const chatListTheme = {
    border: "none",
    borderRadius: "0",
    boxShadow: "none",
    marginTop: 0,
    background: "#ffffff",

    listItemStyle: {
        textColor: "#494949",
        textColorHover: "#2d2d2d",
        disabledTextColor: "#9c9c9c",
        background: "#ffffff",
        disabledBackground: "#e5e5e5",
        backgroundHover: "#ffffff",
        hoverCursor: "unset"
    }
};

export const inputTheme = {
    backgroundColor: "rgb(246,246,246)",
    textColor: "#474747",
    border: 'none',
    borderFocus: "none",
    borderRadius: "5px",
    height: "40px",
    width: "100%",
    padding: "0px 0px 0px 40px",
    caretColor: "#646464",
    iconPositionLeft: 10,
    iconColor: "rgba(175,175,175,0.44)",
    iconFontSize: 'small',
    margin: "5px 5px 5px 5px",

    titleTextTheme: {
        textColor: '#2f2f2f',
        fontSize: '0.9em',
        fontWeight: '500',
        textAlign: 'left',
        margin: "0px 0px 0px 0px"
    },

    inputTextTheme: {
        textColor: '#2f2f2f',
        fontSize: '0.9em',
        fontWeight: 'bold',
        textAlign: 'left',
        margin: "0px 0px 0px 0px"
    },

    placeholderTextTheme: {
        textColor: '#888888',
        fontSize: '1em',
        textAlign: 'left'
    }
};