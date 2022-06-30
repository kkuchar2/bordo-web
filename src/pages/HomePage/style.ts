import {motion} from 'framer-motion';
import styled from 'styled-components';

export const StyledHomePage = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

interface NavbarOpenedProps {
    navbarOpened: boolean;
}

export const StyledContentSection = styled.div<NavbarOpenedProps>`
  flex: 1 0;
  min-width: 600px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  filter: ${props => (props.navbarOpened ? 'blur(8px)' : 'none')};

  @media (max-width: 1024px) {
    min-width: 100px;
  }
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

export const viewTitleTextTheme = {
    textColor: '#ececec',
    fontSize: '1.2em',
    textAlign: 'left',
    fontWeight: 600
};
