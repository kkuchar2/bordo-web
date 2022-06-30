import styled from "styled-components";

export const textTheme = (color: string) => {
    return {
        fontSize: "0.875em",
        textColor: color,
        disabledTextColor: "rgba(255,255,255,0.20)",
        fontWeight: 400,
        margin: "0px 0px 0px 0px"
    };
};

interface StyledMenuItemProps {
    active: boolean;
}

export const StyledMenuItem = styled.div<StyledMenuItemProps>`
  background: ${props => props.active ? "rgba(255, 255, 255, 0.07)" : "none"};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  white-space: nowrap;
  padding: 6px 10px;

  &:hover {
    cursor: ${props => props.active ? "unset" : "pointer"};
    background: rgba(255, 255, 255, 0.07);
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-left: 0;
    white-space: nowrap;
  }

  @media (max-width: 640px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    margin-left: 0;
    white-space: nowrap;
  }
`;