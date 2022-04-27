import styled from "styled-components";

import { StyledSelectGIFCircleProps } from "./ChangeAvatarModeSelector.types";

export const StyledModeSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 20px;
`;

export const StyledSelectGifButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  background: rgba(21, 21, 21, 0.51);
  margin-left: 10px;
  
  &:hover {
    > div {
      color: white;
    }
  }
`;

export const StyledSelectGIFCircle = styled.div<StyledSelectGIFCircleProps>`
  width: 130px;
  height: 130px;
  background: #5b955b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${props => props.url});
  background-size: cover;
`;

export const StyledUploadButtonCircle = styled.div`
  width: 130px;
  height: 130px;
  background: #323232;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledUploadButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  margin-right: 10px;
  background: rgba(21, 21, 21, 0.51);
  border-radius: 5px;

  &:hover {
    > div {
      color: white;
    }
  }
`;

export const uploadButtonTheme = {
    width: "100%",
    height: "100%",
    background: "none",
    disabledBackground: "rgba(47,47,47,0.43)",
    border: "none",
    padding: "0px 0px 0px 0px",
    margin: "0px 0px 0px 0px",
};

export const uploadFileTextTheme = {
    textColor: "#bdbdbd",
    fontSize: "1em",
    fontWeight: 600,
    textAlign: "left",
    margin: "15px 0px 0px 0px"
};