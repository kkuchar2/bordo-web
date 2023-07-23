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

    console.log('bounds', bounds.width);

    const [gifSearchText, setGifSearchText] = useState('');

    const onGifClick = useCallback((gif: IGif, e: SyntheticEvent<HTMLElement, Event>) => {
        if (pending) {
            return;
        }
        onGifSelected?.(gif, e);
    }, [onGifSelected, pending]);

    return <div className={'relative flex w-[400px] flex-col'}>
        <InputWithSmartLabel
            id={'gif_search'}
            name={'gifSearch'}
            type={'text'}
            onChange={e => {
                setGifSearchText(e.target.value);
            }}
            label={'GIPHY_SEARCH_PLACEHOLDER'}/>
        <div className={'mr-[20px] w-full'} ref={ref}>
            <GIFPresentation
                width={bounds.width}
                onGifClick={onGifClick}
                searchText={gifSearchText}
                giphyFetch={giphyFetch}/>
        </div>
        <div className={'mt-[30px] flex w-full justify-end'}>
            <Image src={'/images/PoweredBy_Horizontal_Dark Backgrounds_With Logo.png'}
                width={130} height={50} alt={'powered_by_giphy'}/>
        </div>
    </div>;
};