import {Link, LinkProps} from "react-router-dom";
import styled from "styled-components";

export interface StyledLinkProps {
    marginTop?: number,
    marginRight?: number,
    marginBottom?: number,
    marginLeft?: number,
    disabled?: boolean,
    fontWeight?: number,
}

export const StyledLink = styled(Link)<LinkProps & StyledLinkProps>`
  color: ${props => props.disabled ? "rgba(0,137,88,0.4)" : "#74D79F"};

  &[disabled] {
    pointer-events: none;
  }

  &:hover {
    text-decoration: ${props => props.disabled ? 'none' : 'underline'};
  }
`;

export const StyledCenteredSection = styled.div`
  @media (max-width: 600px) {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: flex-start;
  }

  @media (min-width: 600px) {
    height: 600px;
  }
`;