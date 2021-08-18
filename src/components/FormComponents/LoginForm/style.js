import {motion} from "framer-motion";
import styled from "styled-components";

export const StyledLoginFormComponent = styled(motion.div)`
  border-radius: 6px;
  background: #ffffff;

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