import {motion} from "framer-motion";
import styled from "styled-components";

export const StyledModelsView = styled.div`
  flex: 1 0;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const addItemButtonTheme = {
    width: "150px",
    height: "40px",
    background: "rgba(0,180,105,1)",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "rgb(0,154,90)",
    border: "none",
    borderRadius: "8px",
    margin: "0px 0px 0px 10px",

    text: {
        textAlign: "center",
        fontSize: "14px",
        textColor: "#ffffff",
        fontWeight: "700",
        disabledTextColor: "rgba(255,255,255,0.20)"
    }
};

export const modelSelectorTheme = isMobile => {
    return {
        width: isMobile ? "100%" : "480px",
        height: "50px",
        border: '1px solid ' + "#eeeeee",
        borderRadius: '10px',
        textColor: '#505050',
        disabledTextColor: '#959595',
        backgroundColor: "rgba(255,255,255)",
        disabledBackgroundColor: '#dcdcdc',
        hoverBackgroundColor: "#ffffff",
        iconColor: "#7a7a7a",
        disabledIconColor: "#959595",
        fontSize: '0.9em',
        fontWeight: "500",
        margin: isMobile ? "0px 0px 10px 0px" : "0px 0px 0px 0px",

        listStyle: {
            background: "rgba(255,255,255,0.72)",
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
}

