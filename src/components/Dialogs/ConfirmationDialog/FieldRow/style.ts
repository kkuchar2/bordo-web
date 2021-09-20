import styled from "styled-components";

export const titleTextTheme = {
    textColor: "#323232",
    fontSize: "0.9em",
    textAlign: "left",
    fontWeight: 500
};

export const inputTheme = {
    backgroundColor: "rgba(255,255,255,0)",
    textColor: "#474747",
    border: "2px solid " + "#e3e3e3",
    borderFocus: "2px solid " + "#aea7da",
    borderRadius: "0",
    height: "30px",
    width: "100%",
    padding: "0px",
    caretColor: "#646464",

    titleTextTheme: {
        textColor: '#2f2f2f',
        fontSize: '1em',
        fontWeight: '500',
        textAlign: 'left',
        margin: "0px 0px 10px 0px"
    },

    inputTextTheme: {
        textColor: '#2f2f2f',
        fontSize: '1.0em',
        fontWeight: 'bold',
        textAlign: 'left',
        margin: "0px 0px 0px 0px"
    },

    placeholderTextTheme: {
        textColor: '#ababab',
        fontSize: '1em',
        textAlign: 'left'
    }
};

export const StyledFieldRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
  box-sizing: border-box;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    
    > div {
      width: 100%;
      
      > * {
        width: 100%;
      }
    }
  }
`;
