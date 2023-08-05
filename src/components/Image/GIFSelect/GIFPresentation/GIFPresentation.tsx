import React, { useMemo } from 'react';

import { GifOverlayProps, Grid } from '@giphy/react-components';

import styles from './GIFPresentation.module.scss';
import { GIFPresentationProps } from './GIFPresentation.types';

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

    if (!giphyFetch) {
        return null;
    }

    return <div
        className={styles.gifPresentation}
        style={{ width: width + 20 }}>
        <Grid onGifClick={onGifClick}
            fetchGifs={getFetchFunc}
            borderRadius={10}
            width={width}
            columns={2}
            overlay={(props: GifOverlayProps) => {
                return <div className={'absolute inset-0 z-20 h-full w-full overflow-hidden hover:cursor-pointer hover:border-4 ' +
                    'hover:border-blue-500 rounded-[10px]'}>
                </div>;
            }}
            key={searchText}
            gutter={10}
            noLink={true}/>
    </div>;
};