import {motion} from "framer-motion";
import styled from "styled-components";

export const StyledTable = styled(motion.div)`
  min-width: 800px;
  min-height: 100px;
  max-width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100px;
  }

`;

export const StyledTableRows = styled.div`
  overflow-y: auto;
  margin-top: 10px;
  padding: 3px;
`;
