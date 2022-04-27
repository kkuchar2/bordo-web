import styled from "styled-components";

export const textTheme = (color: string) => {
    return {
        fontSize: "0.875em",
        textColor: color,
        disabledTextColor: "rgba(255,255,255,0.20)",
        fontWeight: 500,
        margin: "0px 0px 0px 10px"
    };
};

export const StyledIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 100%;
  transition: 0.2s ease-out all;
`;

interface StyledMenuItemProps {
    active: boolean;
}

export const StyledMenuItem = styled.div<StyledMenuItemProps>`
  background: ${props => props.active ? "rgba(0,0,0,0.26)" : "none"};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  height: 50px;
  padding-left: 10px;
  width: 220px;
  
  &:hover {
    cursor: pointer;
  }

  @media (max-width: 600px) {
    flex-direction: row;
  }
  
  @media (max-width: 600px) {
    flex-direction: row;
    justify-content: center;
  }
`;