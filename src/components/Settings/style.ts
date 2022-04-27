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

export const sectionTextTheme = {
    textColor: "#dadada",
    fontSize: "1.0em",
    textAlign: "left",
    fontWeight: "500"
};

export const accountDisableMessageTextTheme = {
    textColor: "#a5a5a5",
    fontSize: "0.9em",
    textAlign: "left",
    fontWeight: "400",
    margin: "20px 0px 0px 0px"
};

export const StyledDeleteAccountSection = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin-top: 80px;
  flex: 1 0;
`;

export const StyledAuthenticationSection = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin-top: 80px;
  flex: 1 0;
`;

export const StyledDeleteDisableAccountButtonsSection = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;
  flex: 1 0;
`;

export const StyledSettingsSection = styled(motion.div)`
  margin-left: 10px;
  border-radius: 6px;
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

export const StyledAccountSummary = styled.div`
  border-radius: 10px;
  overflow: hidden;
`;

export const StyledAccountSummaryTop = styled.div`
  background: #5a4440;
  padding: 20px;
  height: 50px;
`;

export const StyledAccountSummaryBottom = styled.div`
  background: #222222;
  padding: 20px;
  position: relative;
`;

export const StyledAccountSummaryFields = styled.div`
  background: #393939;
  position: relative;
  margin-top: 70px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  width: 100%;
`;

export const StyledUsername = styled.div`
  color: #d6d6d6;
  margin-left: 120px;
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