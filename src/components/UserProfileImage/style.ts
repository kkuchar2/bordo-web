import styled from "styled-components";

export interface StyledProfilePictureProps {
    url: string,
    size: number
}

export const StyledProfilePicture = styled.div<StyledProfilePictureProps>`
  background-color: rgba(255, 255, 255, 0.46);
  background-image: url(${props => props.url});
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  border-radius: 50%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
`;

export const spinnerTheme = {
    color: "#9f9f9f",
    disabledColor: "rgba(222,222,222,0.07)",

    text: {
        textColor: "#505050",
        disabledTextColor: "rgba(255,255,255,0.20)",
        fontSize: "0.8em"
    }
};

export interface StyledUserActiveIndicatorProps {
    active: boolean
}

export const StyledEditableProfilePictureProperty = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledPropertyValues = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PropertyValueSection = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    padding: 20px;
  }
`;