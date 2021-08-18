import styled from "styled-components";

export const StyledHomePage = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const StyledHomePageContent = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  min-width: 200px;
  display: flex;
  flex-direction: row;
  height: 100%;
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const StyledContentSection = styled.div`
  flex: 1 0;
  min-width: 600px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 600px) {
    min-width: 100px;
  }
`;

export const StyledTopSection = styled.div`
  margin-left: 50px;
  margin-right: 50px;
  border-bottom: 2px solid #f9faff;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 30px;
  min-height: 100px;
`;

export const StyledBottomSection = styled.div`
  overflow-y: auto;
  overflow-x: auto;
  flex: 1 0;
`;

export const viewTitleTextTheme = {
    textColor: "#323232",
    fontSize: "1.4em",
    textAlign: "left",
    fontWeight: 500
};

export const viewDescriptionTextTheme = {
    textColor: "#323232",
    fontSize: "1.2em",
    textAlign: "left",
    fontWeight: 300
};