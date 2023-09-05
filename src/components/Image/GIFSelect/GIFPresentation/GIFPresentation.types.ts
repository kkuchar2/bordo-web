import { SyntheticEvent } from 'react';

import { GiphyFetch } from '@giphy/js-fetch-api';
import { IGif } from '@giphy/js-types';

export type GIFPresentationProps = {
    onGifClick?: (gif: IGif, e: SyntheticEvent<HTMLElement, Event>) => void;
    searchText?: string,
    giphyFetch: GiphyFetch,
    width: number,
}