import styled from "styled-components";

export interface ThreeDotsLoaderProps {
  color?: string;
  scale?: number;
  time?: number;
}

export const StyledThreeDotsLoader = styled.div<ThreeDotsLoaderProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  margin: 20px;
  width: 100px;
  transform: scale(${(props) => props.scale || 1});
`;

export const StyledThreeDotsLoaderInner = styled.div<ThreeDotsLoaderProps>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin-top: 36px;
  animation: loader10 ${props => props.time}s ease alternate infinite;
  animation-delay: 0.36s;
  transform: scale(1);
  box-sizing: border-box;
  
  &:after {
    content: '';
    position: absolute;
    right: -40px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    animation: loader10 ${props => props.time}s ease alternate infinite;
    animation-delay: 0.54s;
    box-sizing: border-box;
  }

  &:before {
    content: '';
    position: absolute;
    left: -40px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    animation: loader10 ${props => props.time}s ease alternate infinite;
    animation-delay: 0.18s;
    box-sizing: border-box;
  }

  @keyframes loader10 {
    0% {
      box-shadow: 0 -18px 0 -18px ${props => props.color};
    }
    100% {
      box-shadow: 0 -18px 0 ${props => props.color};
    }
  }
`;
