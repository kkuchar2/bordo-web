import {motion} from "framer-motion";
import styled from "styled-components";

export const textTheme = {
    fontSize: "0.875em",
    textColor: "#929292",
    disabledTextColor: "rgba(255,255,255,0.20)",
    fontWeight: 500,
    margin: "0px 0px 0px 10px"
};

export const StyledIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 100%;
  transition: 0.2s ease-out all;
`;

interface StyledMenuItemProps {
    active: boolean;
}

export const StyledMenuItem = styled(motion.div)<StyledMenuItemProps>`
  background: ${props => props.active ? "rgba(73, 119, 200, 0.21)" : "none"};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  transition: 0.3s ease-out all;
  padding-left: 10px;
  
  &:hover {
    cursor: pointer;
  }

  @media (max-width: 600px) {
    flex-direction: row;
  }
  
  @media (max-width: 600px) {
    flex-direction: row;
    justify-content: center;
  }
`;