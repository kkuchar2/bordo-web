import styled from "styled-components";

export const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 30px 30px;
  box-sizing: border-box;

  @media (min-width: 600px) {
    width: 420px;
    position: relative;
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;