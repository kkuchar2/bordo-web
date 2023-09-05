import { SyntheticEvent } from 'react';

import { GiphyFetch } from '@giphy/js-fetch-api';
import { IGif } from '@giphy/js-types';

export type GIFSelectProps = {
    onGifSelected?: (gif: IGif, e: SyntheticEvent<HTMLElement, Event>) => void;
    searchText?: string,
    giphyFetch: GiphyFetch,
    pending?: boolean
}