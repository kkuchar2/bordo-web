import {motion} from "framer-motion";
import styled from "styled-components";

export const StyledForgotPasswordForm = styled(motion.div)`
  border-radius: 6px;


  @media (max-width: 600px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-left: 10px;
    margin-right: 10px;
  }

  .form {
    border-radius: 6px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    padding: 30px 30px 30px;

    @media (min-width: 600px) {
      width: 350px;
      position: relative;
    }

    @media (max-width: 600px) {
      width: 100%;
    }

    .buttonGroup {
      width: 100%;
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const StyledUnknownError = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

export const descriptionTextTheme = {
    textColor: "#474747",
    fontSize: "15px",
    textAlign: "center",
    margin: "20px 0px 0px 0px"
};