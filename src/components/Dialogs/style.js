import styled from "styled-components";
import {motion} from "framer-motion";

export const StyledDialogs = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(218, 218, 218, 0.64);
  position: absolute;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledDialog = styled(motion.div)`
  background: white;
  max-width: 500px;
  width: 450px;
  max-height: 600px;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 20px 20px 20px 0 rgba(0, 0, 0, 0.11);

  @media (max-width: 600px) {
    width: 100%;
    height: 100%;
    max-height: 100%;
    max-width: 100%;
    border-radius: 0;
    box-shadow: none;
  }
`;