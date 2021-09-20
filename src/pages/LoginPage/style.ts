import {motion} from "framer-motion";
import styled from "styled-components";

export const StyledLoginPage = styled(motion.div)`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  transition: all 1s;
  overflow: auto;
  
  @media (max-width: 900px) {
    flex-direction: column;
  }

  @media (max-height: 800px) and (min-width: 900px) {
    flex-direction: row;;
    justify-content: center;
  }

  @media (min-height: 800px) and (min-width: 900px) {
    flex-direction: column;
    justify-content: center;
  }

  @media (min-height: 800px) and (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
  }
  
  @media (max-height: 800px) and (max-width: 900px) {
    flex-direction: column;
  }
`;

export const AnimatedText = styled(motion.div)``;

export const StyledTitles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 600px;
  max-width: 100%;
  z-index: 1;
  padding: 20px;
  box-sizing: border-box;
`;

export const titleTheme = {
    fontSize: "clamp(32px, 1.5rem, 100px)",
    textColor: "#ffffff",
    disabledTextColor: "rgba(255,255,255,0.20)",
    fontWeight: 800,
    textAlign: "center"
};

export const descriptionTheme = {
    fontSize: "clamp(15px, 1.2rem, 100px)",
    textColor: "#ffffff",
    disabledTextColor: "rgba(255,255,255,0.20)",
    fontWeight: 600,
    textAlign: "center"
};