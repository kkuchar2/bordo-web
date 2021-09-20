import styled from "styled-components";

export const StyledRegistrationPage = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  transition: all 1s;
  overflow: auto;

  @media (max-width: 900px) {
    flex-direction: column;
  }

  @media (max-height: 800px) and (min-width: 900px) {
    flex-direction: row;;
    justify-content: center;
  }

  @media (min-height: 800px) and (min-width: 900px) {
    flex-direction: column;
    justify-content: center;
  }

  @media (min-height: 800px) and (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
  }

  @media (max-height: 800px) and (max-width: 900px) {
    flex-direction: column;
  }
`;