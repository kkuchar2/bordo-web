import styled from 'styled-components';

export const StyledCenteredSection = styled.div`
  @media (max-width: 600px) {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: flex-start;
  }

  @media (min-width: 600px) {
    height: 600px;
  }
`;