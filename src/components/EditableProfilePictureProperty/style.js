import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const StyledProfilePicture = styled.div`
  background-color: rgba(255, 255, 255, 0.46);
  background-image: url(${props => props.url});
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 50%;
  background-size: contain;
  border: 1px solid #e3e3e3;
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

export const StyledUploadFileButton = styled(FontAwesomeIcon)`
  background: rgba(91, 95, 126, 0.45);
  color: white;
  position: absolute;
  top: -5px;
  right: -10px;
  border-radius: 50%;
  font-size: 0.7em;
  padding: 10px;

  @media (max-width: 600px) {
    font-size: 0.5em;
    padding: 7px;
  }
  
  &:hover {
    background: rgba(83, 87, 117, 0.68);
    cursor: pointer;
  }

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
  height: 50px;
  padding: 50px;

  @media (max-width: 600px) {
    padding: 20px;
  }
`;