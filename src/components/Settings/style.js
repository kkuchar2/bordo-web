import {motion} from "framer-motion";
import styled from "styled-components";

export const StyledSettingsView = styled.div`
  width: 100%;
  background: #1a1a1a;
  margin-left: 10px;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const StyledLogoutSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
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
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledSettingsPropertiesSection = styled.div`
  background: #1f1f1f;
  border-radius: 10px;
  width: 400px;
  max-width: 400px;
  padding: 20px;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  > div:not(:first-child):not(:last-child) {
    margin-top: 20px;
  }
`;