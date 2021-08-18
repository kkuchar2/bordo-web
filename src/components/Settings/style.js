import {motion} from "framer-motion";
import styled from "styled-components";

export const StyledSettingsView = styled.div`
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

export const StyledDeleteAccountSection = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: 40px;
  flex: 1 0;
`;

export const StyledSettingsSection = styled(motion.div)`
  margin-left: 10px;
  border-radius: 10px;
  background: #fafafa;
  padding: 20px 20px 0;
  display: flex;
  flex-direction: column;

  @media (max-width: 1200px) {
    width: 100%;
    max-width: 100%;
    margin-left: 0;
    padding: 0;
    border-radius: 0;
  }
`;

export const StyledSettingsPropertiesSection = styled.div`
  border-radius: 10px;
  width: 500px;
  max-width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-width: 1200px) {
    width: calc(100% - 40px);
    max-width: 100%;
  }
  
  > div:not(:first-child):not(:last-child) {
    margin-top: 20px;
  }
`;