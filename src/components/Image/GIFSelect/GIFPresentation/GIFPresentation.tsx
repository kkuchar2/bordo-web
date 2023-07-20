import React, { useMemo } from 'react';

import { Grid } from '@giphy/react-components';
import styled from 'styled-components';

import { GIFPresentationProps } from './GIFPresentation.types';

interface StyledGIFPresentationProps {
    width: number;
}

const StyledGIFPresentation = styled.div<StyledGIFPresentationProps>`
  height: 500px;
  width: ${({ width }) => width + 20}px;
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

export const GIFPresentation = (props: GIFPresentationProps) => {

    const { searchText, onGifClick, giphyFetch, width } = props;

    const getFetchFunc = useMemo(() => {
        if (!searchText || searchText.length === 0) {
            return (offset: number) => giphyFetch.trending({ offset, limit: 10 });
        }
        else {
            return (offset: number) => giphyFetch.search(searchText, { offset, limit: 10 });
        }
    }, [searchText]);

    return <StyledGIFPresentation width={width}>
        <Grid onGifClick={onGifClick}
            fetchGifs={getFetchFunc}
            borderRadius={10}
            width={width}
            columns={2}
            key={searchText}
            gutter={10}
            noLink={true}/>
    </StyledGIFPresentation>;
};