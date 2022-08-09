import {motion} from 'framer-motion';
import styled from 'styled-components';

export const StyledDialogs = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: rgba(47, 47, 47, 0.89);
  position: absolute;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export interface StyledDialogProps {
    width?: number
}

export const StyledDialog = styled(motion.div)<StyledDialogProps>`
  background: #373737;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  width: ${props => props.width ? `${props.width}px` : 'auto'};

  @media (max-width: 1024px) {
    width: ${props => props.width < 900 ? `${props.width}px` : '100%'};
    margin-left: 10px;
    margin-right: 10px;
  }
`;