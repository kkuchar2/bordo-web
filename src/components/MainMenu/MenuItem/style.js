import {motion} from "framer-motion";
import styled from "styled-components";

export const textTheme = {
    fontSize: "1em",
    textColor: "#929292",
    disabledTextColor: "rgba(255,255,255,0.20)",
    fontWeight: 500,
};

export const StyledIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 100%;
`;

export const StyledMenuItem = styled(motion.div)`
  display: flex;  @media (max-width: 600px) {
  flex-direction: row;
}
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  width: 100%;
  height: 60px;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 600px) {
    flex-direction: row;
    justify-content: center;
  }
`;