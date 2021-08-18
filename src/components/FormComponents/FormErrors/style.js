import styled from "styled-components";

export const StyledFormError = styled.div`
  display: flex;
  margin: 30px 10px 10px 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .icon {
    color: #ff4949;
  }
`;

export const StyledFieldError = styled.div`
  display: flex;
  margin: 10px 10px 10px 0;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  .icon {
    color: #ff4949;
  }
`;

export const errorTextTheme = {
    textColor: "#ff4949",
    fontSize: "15px",
    margin: "0px 0px 0px 5px"
};