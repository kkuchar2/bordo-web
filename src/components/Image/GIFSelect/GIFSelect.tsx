import React, {SyntheticEvent, useCallback, useState} from "react";

import {IGif} from "@giphy/js-types";
import {useTranslation} from "react-i18next";
import {useMeasure} from "react-use";

import {GIFPresentation} from "./GIFPresentation/GIFPresentation";
import {GIFSelectProps} from "./GIFSelect.types";

export const GIFSelect = (props: GIFSelectProps) => {

    const { onGifSelected, giphyFetch, pending } = props;

    const [ref, bounds] = useMeasure();

    const [gifSearchText, setGifSearchText] = useState('');

    const { t } = useTranslation();

    const onGifClick = useCallback((gif: IGif, e: SyntheticEvent<HTMLElement, Event>) => {
        if (pending) {
            return;
        }
        onGifSelected?.(gif, e);
    }, [onGifSelected, pending]);

    return <div ref={ref} className={'p-[10px] relative box-border w-full'}>
        <input
            className={'input'}
            autoFocus={false}
            style={{ width: '100%', marginTop: 0 }}
            id={'gif_search'}
            title={''}
            type={'text'}
            autoComplete={'off'}
            value={gifSearchText}
            onChange={e => setGifSearchText(e.target.value)}
            placeholder={t('GIPHY_SEARCH_PLACEHOLDER')}/>
        <GIFPresentation
            width={bounds.width}
            onGifClick={onGifClick}
            searchText={gifSearchText}
            giphyFetch={giphyFetch}/>
        <div className={'h-[10px]'}>
            {pending ?
                <progress className="progress w-full mt-2 bg-gray-600 h-[10px] progress-accent"></progress> : null}
        </div>
    </div>;
};