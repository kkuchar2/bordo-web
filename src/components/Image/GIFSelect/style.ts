import styled from "styled-components";

export const searchGifInputTheme = {
    backgroundColor: "#1a1a1a",
    textColor: "#474747",
    border: "none",
    borderFocus: "none",
    borderRadius: "4px",
    height: "40px",
    width: "100%",
    padding: "10px",
    caretColor: "#646464",

    titleTextTheme: {
        textColor: '#b2b2b2',
        fontSize: '0.9em',
        fontWeight: '600',
        textAlign: 'left',
        margin: "0px 0px 0px 0px"
    },

    inputTextTheme: {
        textColor: '#bebebe',
        fontSize: '0.9em',
        fontWeight: '600',
        textAlign: 'left',
        margin: "0px 0px 0px 0px"
    },

    placeholderTextTheme: {
        textColor: '#696969',
        fontSize: '0.9em',
        textAlign: 'left',
        fontWeight: '600'
    }
};

export const StyledGifSelector = styled.div`
  padding: 10px;
  position: relative;
  box-sizing: border-box;
`;

export const StyledPendingOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(44, 44, 44, 0.8);
  z-index: 1;
`;