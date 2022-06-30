import {motion} from "framer-motion";
import styled from "styled-components";

export const StyledSettingsView = styled(motion.div)`
  flex: 1 0;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 0;
    flex: 1 0;
  }
`;

export const StyledSettingsSection = styled(motion.div)`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 600px;

  @media (max-width: 1200px) {
    width: 100%;
    max-width: 100%;
    margin-left: 0;
    border-radius: 0;
  }
`;

export const StyledAccountSummaryBottom = styled.div`
  position: relative;
  
  @media (max-width: 1200px) {
    background: rgba(255, 255, 255, 0.06);
    margin: 10px;
    border-radius: 5px;
  }
`;

export const StyledAccountSummaryFields = styled.div`
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
`;

export const StyledSettingsPropertiesSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 50px;

  @media (max-width: 600px) {
    padding: 20px;
  }
`;