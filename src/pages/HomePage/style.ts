import {motion} from "framer-motion";
import styled from "styled-components";

export const StyledHomePage = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const StyledHomePageContent = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  min-width: 200px;
  display: flex;
  flex-direction: row;
  height: 100%;
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const StyledContentSection = styled(motion.div)`
  flex: 1 0;
  min-width: 600px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 600px) {
    min-width: 100px;
  }
`;

export const StyledTopSection = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 30px;
  min-height: 100px;
  background: white;
`;

export const StyledAnimatedHeader = styled(motion.div)`
`;

export const StyledBottomSection = styled.div`
  overflow-y: auto;
  overflow-x: auto;
  flex: 1 0;
  background: white;
`;

export const viewTitleTextTheme = {
    textColor: "#4D4D4D",
    fontSize: "1.9375em",
    textAlign: "left",
    fontWeight: 400
};

export const viewDescriptionTextTheme = {
    textColor: "#7c7c7c",
    fontSize: "1.2em",
    textAlign: "left",
    fontWeight: 400
};