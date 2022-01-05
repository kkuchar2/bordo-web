import EditIcon from '@material-ui/icons/Edit';
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

export const StyledUploadFileButton = styled(EditIcon)`
  background: rgb(73, 119, 200);
  color: white;
  position: absolute;
  top: -5px;
  right: -10px;
  border-radius: 50%;
  padding: 2px;
  border: 4px solid #F6F6F6;
  width: 16px;
  height: 16px;

  @media (max-width: 600px) {
    font-size: 0.5em;
    padding: 7px;
  }

  &:hover {
    background: rgb(52, 91, 161);
    cursor: pointer;
  }
`;

export interface StyledUserActiveIndicatorProps {
    active: boolean
}

export const StyledUserActiveIndicator = styled.div<StyledUserActiveIndicatorProps>`
  background: ${props => props.active ? "#03A700" : "#cbcbcb"};
  color: white;
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 4px solid #F6F6F6;
  bottom: 0;
  right: 0;
  font-size: 0.7em;
`;

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