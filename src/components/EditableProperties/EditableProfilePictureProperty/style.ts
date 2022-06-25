import Avatar from "react-avatar";
import styled from "styled-components";

export interface StyledProfilePictureProps {
    url: string,
    size: number
}

export interface StyledUserActiveIndicatorProps {
    active: boolean
}

export const changeAvatarTextTheme = {
    fontSize: "0.875em",
    textColor: "#fff",
    disabledTextColor: "rgba(255,255,255,0.20)",
    textAlign: "center",
    fontWeight: 600,
    margin: "0px 10px 0px 10px",
};

export const StyledUserActiveIndicator = styled.div<StyledUserActiveIndicatorProps>`
  background: ${props => props.active ? "#03A700" : "#7a7a7a"};
  color: white;
  position: absolute;
  top: 0;
  left: 0;
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
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  &:hover {
    background: rgba(61, 61, 61, 0.77);
  }
`;

export const StyledAvatar = styled(Avatar)`
  img {
    object-fit: cover;
  }
`;

interface StyledAvatarWithOverlayProps {
    useImageUpload: boolean
}

export const StyledAvatarWithOverlay = styled.div<StyledAvatarWithOverlayProps>`
  box-sizing: border-box;
  position: relative;
  height: 100%;
  border-radius: 50%;
  background: none;
  
  ${StyledOverlay} {
    display: none;
  }

  &:hover {
    ${StyledAvatar}, ${StyledOverlay} {
      background: rgba(28, 28, 28, 0.7);
      display: flex;
    }
  }
`;

export const StyledPropertyValues = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
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