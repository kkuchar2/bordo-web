import {motion} from 'framer-motion';
import styled from 'styled-components';

export const StyledHomePage = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

export const StyledTopSection = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 30px;
  min-height: 60px;
`;

export const StyledAnimatedHeader = styled(motion.div)``;

export const StyledBottomSection = styled.div`
  overflow-y: auto;
  overflow-x: auto;
  flex: 1 0;
`;