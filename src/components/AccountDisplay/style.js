import styled from "styled-components";

export const StyledAccountInfo = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 20px;
  
  @media (max-width: 600px) {
    flex-direction: row;
    padding: 5px;
    margin-left: auto;
  }
`;

export const logoutButtonTheme = {
    width: "140px",
    height: "40px",
    background: "rgba(0,180,105,1)",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "rgb(0,140,81)",
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

export const StyledAccountEmailAndPicture = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    flex-direction: row;
  }
  
  .profileDetails {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

export const emailTextTheme = isMobile => {
    return {
        textColor: "#606060",
        fontSize: isMobile ? "1em" : "1.2em",
        fontWeight: 400,
        margin: "10px 0px 10px 0px"
    }
}