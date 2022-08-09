import styled from 'styled-components';

import {StyledSelectGIFCircleProps} from './ChangeAvatarModeSelector.types';

export const StyledSelectGIFCircle = styled.div<StyledSelectGIFCircleProps>`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #5b955b url(${props => props.url});
  background-size: cover;
  position: relative;

  &:hover {
    &:after {
      border-radius: 100%;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(149, 149, 149, 0.5);
    }
  }
`;