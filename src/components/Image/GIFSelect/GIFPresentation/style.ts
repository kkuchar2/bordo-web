import styled from 'styled-components';

export const StyledGIFPresentation = styled.div`
  width: 600px;
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-top: 20px;
  box-sizing: border-box;

  .giphy-gif {
    box-sizing: border-box;
    border: 3px solid #424242;

    &:hover {
      cursor: pointer;
      border: 3px solid #a8a8a8;
    }

  }
`;