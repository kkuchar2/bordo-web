import styled from "styled-components";

interface StyledHamburgerButtonProps {
    navbarOpened: boolean;
    topNavbarVisible: boolean;
}

export const StyledHamburgerButton = styled.div<StyledHamburgerButtonProps>`
  width: 50px;
  height: 50px;
  margin-right: 20px;
  z-index: 1;

  @media (max-width: 768px) {
    position: ${props => props.navbarOpened ? 'fixed' : 'absolute'};
    top: ${props => {
      if (!props.topNavbarVisible && props.navbarOpened) {
        return '90px';
      }

      return '10px';
    }};
  }

  &:hover {
    cursor: pointer;
  }
`;

const after = 'bottom 0.1s ease-in 0.25s,transform 0.22s cubic-bezier(0.55,0.055,0.675,0.19)';
const before = 'top 0.1s ease-in 0.25s,opacity 0.1s ease-in';
const after_active = 'bottom 0.1s ease-out,transform 0.22s cubic-bezier(0.215,0.61,0.355,1) 0.12s';
const before_active = 'top 0.1s ease-out,opacity 0.1s ease-out 0.12s';

export const StyledHamburgerButtonInner = styled.div<StyledHamburgerButtonProps>`
  position: absolute;
  top: 50%;
  right: 0;
  width: 30px;
  height: 3px;
  border-radius: 2px;
  background: #e5e5e5;
  transition: transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19) 0s;
  transform: ${props => props.navbarOpened ? 'rotate(225deg)' : 'rotate(0deg)'};

  &:before {
    content: "";
    display: block;
    position: absolute;
    left: auto;
    right: 0;
    height: 3px;
    border-radius: 3px;
    background: #e5e5e5;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    width: ${props => props.navbarOpened ? '100%' : '120%'};
    top: ${props => props.navbarOpened ? '0' : '-10px'};
    opacity: ${props => props.navbarOpened ? '0' : '1'};
    transition: ${props => props.navbarOpened ? before_active : before};
  }

  &:after {
    content: "";
    display: block;
    position: absolute;
    left: auto;
    right: 0;
    height: 3px;
    border-radius: 4px;
    background: #e5e5e5;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    width: ${props => props.navbarOpened ? '100%' : '80%'};
    bottom: ${props => props.navbarOpened ? '0' : '-10px'};
    transform: ${props => props.navbarOpened ? 'rotate(-90deg)' : 'rotate(0deg)'};
    transition: ${props => props.navbarOpened ? after_active : after};
  }
`;