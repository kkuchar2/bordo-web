import {motion} from "framer-motion";
import styled from "styled-components";

export const StyledMainMenu = styled(motion.div)`
  color: #c4c4c4;
  width: 350px;
  min-width: 300px;
  height: 100%;
  background: #fafafa;
  padding: 20px;

  @media (max-width: 600px) {
    width: calc(100% - 20px);
    height: unset;
    padding: 10px;
  }
`;

export const StyledMenuItems = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    flex-direction: row;
  }
`;

export const StyledMenuButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2d2d2d;
`;

export const StyledMenuSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    flex-direction: row-reverse;
  }
`;