import {motion} from "framer-motion";
import styled from "styled-components";

export const StyledLoginFormComponent = styled(motion.div)`
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  margin: 20px;
  
  @media (max-width: 400px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 10px;
    margin: 0;
  }

  .form {
    position: relative;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    padding: 30px 30px 30px;
    width: 100%;
    box-sizing: border-box;
  }
`;