import styled from "styled-components";

export const StyledChangeAvatarDialog = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const titleTextTheme = {
    textColor: "#A9A9A9",
    fontSize: "1.2em",
    fontWeight: 600,
    textAlign: "left"
};

export const SliderWithIcons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  padding-bottom: 30px;
  padding-top: 30px;
`;

export interface CropContainerProps {
    imageSelected: boolean
}

export const CropContainer = styled.div<CropContainerProps>`
  position: relative;
  height: ${props => props.imageSelected ? "400px" : "200px"};
  width: ${props => props.imageSelected ? "500px" : "200px"};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const StyledImage = styled.img`
  position: relative;
  height: 500px;
  width: 500px;
  box-sizing: border-box;
  object-fit: contain;
  border-radius: 100%;
`;

export const sliderTheme = {
    width: "300px",
    height: 15,
    trackHeight: 2,
    railHeight: 2,
    fillProgressColor: 'rgba(51,125,255,0)',
    thumbColor: 'transparent',
    thumbSize: 40,
    thumbMargin: {
        marginTop: -15,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: -14
    },
    valueLabelPositionLeft: "calc(-50% + 15px)",
    valueLabelBackground: '#337dff',

    valueLabelFontColor: '#ffffff',
    markLabelFontColor: '#adadad',
    markLabelActiveFontColor: '#337dff',
    markLabelActiveFontWeight: 700,
    markColor: '#adadad',
    markActiveColor: '#337dff',
    railColor: '#5B92FC',
    trackColor: '#4A4A4A',
    markSize: 8,
    markActiveSize: 8,
    modernMarkLabelFontSize: "1em",
    modernMinMarkLabelTopMargin: 45,
    modernMinMarkLabelRightMargin: 0,
    modernMaxMarkLabelRightMargin: -10,
    modernMaxMarkLabelTopMargin: 45,
    markMargin: {
        marginTop: -3,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: -2
    },
    markActiveMargin: {
        marginTop: -3,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: -2
    }
};