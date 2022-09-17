import styled from 'styled-components';

export interface CropContainerProps {
    imageSelected: boolean;
    width: number;
}

export const CropContainer = styled.div<CropContainerProps>`
  position: relative;
  height: ${props => props.imageSelected ? '400px' : '200px'};
  width: ${props => props.imageSelected ? props.width : '200px'};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;