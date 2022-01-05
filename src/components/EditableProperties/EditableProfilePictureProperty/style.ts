import styled from "styled-components";

export interface StyledProfilePictureProps {
    url: string,
    size: number
}

export const StyledProfilePicture = styled.div<StyledProfilePictureProps>`
  background-color: rgba(141, 141, 141, 0.46);
  background-image: url(${props => props.url});
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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

export const StyledUserActiveIndicator = styled.div<StyledUserActiveIndicatorProps>`
  background: ${props => props.active ? "#03A700" : "#7a7a7a"};
  color: white;
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 4px solid #1F1F1F;
  bottom: 3px;
  right: 2px;
  font-size: 0.7em;
`;

export interface EditableProfilePictureProps {
    enableUpload: boolean
}

export const StyledEditableProfilePictureProperty = styled.div<EditableProfilePictureProps>`
  display: flex;
  flex-direction: row;

  &:hover {
    cursor: ${props => props.enableUpload ? 'pointer' : 'unset'};
  }
`;

export const StyledOverlay = styled.div`
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(61, 61, 61, 0.77);
  }
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