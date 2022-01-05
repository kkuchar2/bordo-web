import styled from "styled-components";

export const StyledMainMenu = styled.div`
  color: #c4c4c4;
  width: 320px;
  min-width: 300px;
  height: 100%;
  background: #1F1F1F;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    width: 100%;
    height: unset;
    padding: 10px;
  }
`;

export const StyledMenuItems = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    flex-direction: row;
  }
`;

export const menuTitleTheme = {
    fontWeight: "600",
    textColor: "#8E8E8E",
    fontSize: "0.8em",
    textAlign: "left",
    margin: "0px 0px 20px 0px"
};

export const StyledMenuButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2d2d2d;
`;

export const StyledMenuSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    flex-direction: row-reverse;
  }
`;