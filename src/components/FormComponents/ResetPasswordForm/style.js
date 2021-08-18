import {motion} from "framer-motion";
import styled from "styled-components";

export const needAccountTextTheme = {
    textColor: "#bbbbbb",
    fontSize: "15px"
};

export const StyledResetPasswordFormComponent = styled(motion.div)`
  border-radius: 6px;
  background: #323232;
  box-shadow: 20px 20px 20px 0 rgba(0,0,0,.4);

  @media (max-width: 600px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .form {
    border-radius: 6px;

    display: flex;
    flex-direction: column;
    padding: 30px 30px 30px;

    @media (min-width: 600px) {
      width: 320px;
      position: relative;
    }

    @media (max-width: 600px) {
      width: 100%;
    }

    .buttonGroup {
      width: 100%;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
`;

export const StyledUnknownError = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  margin-top: 20px;
`;