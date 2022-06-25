import styled from "styled-components";

export const titleTextTheme = {
    textColor: "#ffffff",
    fontSize: "1.2em",
    textAlign: "left",
    fontWeight: 600
};

export const descriptionTextTheme = {
    textColor: "#bdbdbd",
    fontSize: "15px",
    textAlign: "left",
    fontWeight: 400
};

export const cancelButtonTheme = {
    width: "120px",
    height: "40px",
    background: "none",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "none",
    border: "none",
    borderRadius: "3px",

    text: {
        textAlign: "center",
        fontSize: "14px",
        textColor: "#ffffff",
        fontWeight: "700",
        disabledTextColor: "rgba(255,255,255,0.20)",
    }
};

export const confirmButtonTheme = {
    width: "150px",
    height: "40px",
    background: "#4A4AFF",
    disabledBackground: "rgba(74,74,255,0.46)",
    hoverBackground: "#4e4eff",
    border: "none",
    borderRadius: "3px",
    margin: "0px 0px 0px 10px",

    text: {
        textAlign: "center",
        fontSize: "14px",
        textColor: "#ffffff",
        fontWeight: "700",
        disabledTextColor: "rgba(255,255,255,0.20)",
    }
};

export const StyledDialogCloseButton = styled.div`
  position: absolute;
  right: 32px;
  top: 22px;
  width: 25px;
  height: 25px;
  opacity: 0.7;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }

  &:before, &:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 25px;
    width: 3px;
    background-color: #d3d3d3;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

export const StyledDialogTopSection = styled.div`
  padding: 20px 20px 0;
  box-sizing: border-box;
`;