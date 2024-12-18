import React, { SyntheticEvent, useCallback, useState } from 'react';

import { IGif } from '@giphy/js-types';
import Image from 'next/image';
import { useMeasure } from 'react-use';

import { GIFPresentation } from './GIFPresentation/GIFPresentation';
import { GIFSelectProps } from './GIFSelect.types';

import { InputWithSmartLabel } from '@/components/InputWithSmartLabel/InputWithSmartLabel';

export const GIFSelect = (props: GIFSelectProps) => {

    const { onGifSelected, giphyFetch, pending } = props;

    const [ref, bounds] = useMeasure<HTMLDivElement>();

    const [gifSearchText, setGifSearchText] = useState('');

    const onGifClick = useCallback((gif: IGif, e: SyntheticEvent<HTMLElement, Event>) => {
        if (pending) {
            return;
        }
        onGifSelected?.(gif, e);
    }, [onGifSelected, pending]);

    return <div className={'relative flex w-full flex-col'}>
        <InputWithSmartLabel
            id={'gif_search'}
            name={'gifSearch'}
            type={'text'}
            value={gifSearchText}
            onChange={e => {
                setGifSearchText(e.target.value);
            }}
            label={'GIPHY_SEARCH_PLACEHOLDER'}/>
        <div className={'w-full pr-[20px]'} ref={ref}>
            <GIFPresentation
                width={bounds.width}
                onGifClick={onGifClick}
                searchText={gifSearchText}
                giphyFetch={giphyFetch}/>
        </div>
        <div className={'mt-[30px] flex w-full justify-end'}>
            <Image
                src={'/images/PoweredBy_Horizontal_Dark Backgrounds_With Logo.png'}
                width={150} height={100} alt={'powered_by_giphy'}/>
        </div>
    </div>;
};