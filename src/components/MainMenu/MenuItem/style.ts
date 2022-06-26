import styled from "styled-components";

export const textTheme = (color: string) => {
    return {
        fontSize: "0.875em",
        textColor: color,
        disabledTextColor: "rgba(255,255,255,0.20)",
        fontWeight: 500,
        margin: "0px 0px 0px 0px"
    };
};

interface StyledMenuItemProps {
    active: boolean;
}

export const StyledMenuItem = styled.div<StyledMenuItemProps>`
  background: ${props => props.active ? "rgba(12,12,12,0.26)" : "none"};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  white-space: nowrap;
  height: 40px;
  padding: 7px;

  &:hover {
    cursor: ${props => props.active ? "unset" : "pointer"};
    background: ${props => props.active ? "rgba(100,100,100,0.26)" : "#4a4a4a"};
  }

  @media (max-width: 1280px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 0;
    white-space: nowrap;
  }
`;