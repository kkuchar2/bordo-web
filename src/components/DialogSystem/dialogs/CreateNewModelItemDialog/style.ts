import styled from "styled-components";

export const StyledCreateNewModelItemDialog = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #282828;
  margin-top: 20px;
`;

export const titleModelTextTheme = {
    textColor: "#d9d9d9",
    fontSize: "1.0em",
    textAlign: "left",
    fontWeight: 700
};

export const titleModelValueTextTheme = {
    textColor: "#FF465C",
    fontSize: "1.0em",
    textAlign: "left",
    fontWeight: 700,
    margin: "0px 0px 0px 10px"
};

export const StyledModelDescription = styled.div`
  display: flex;
`;

export const CreateNewModelCustomDescription = styled.div`
  padding: 10px;
`;

export const StyledDialogContentSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;