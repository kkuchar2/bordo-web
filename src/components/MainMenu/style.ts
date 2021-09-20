import {motion} from "framer-motion";
import styled from "styled-components";

export const StyledMainMenu = styled(motion.div)`
  color: #c4c4c4;
  width: 360px;
  min-width: 300px;
  height: 100%;
  background: #F6F6F6;
  padding: 40px;
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
    fontWeight: "450",
    textColor: "#8E8E8E",
    fontSize: "1.1em",
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