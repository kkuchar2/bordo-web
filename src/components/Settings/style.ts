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
`;

export const StyledSettingsPropertiesSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 50px;
`;