import React, {SyntheticEvent, useCallback, useState} from "react";

import {IGif} from "@giphy/js-types";

import {GIFPresentation} from "./GIFPresentation/GIFPresentation";
import {GIFSelectProps} from "./GIFSelect.types";
import {StyledGifSelector} from "./style";

export const GIFSelect = (props: GIFSelectProps) => {

    const { onGifSelected, giphyFetch, pending } = props;

    const [gifSearchText, setGifSearchText] = useState('');

    const onGifClick = useCallback((gif: IGif, e: SyntheticEvent<HTMLElement, Event>) => {
        if (pending) {
            return;
        }
        onGifSelected?.(gif, e);
    }, [onGifSelected, pending]);

    return <StyledGifSelector>
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
            placeholder={'Search GIPHY'}/>
        <GIFPresentation onGifClick={onGifClick} searchText={gifSearchText} giphyFetch={giphyFetch}/>
        <div className={'h-[10px]'}>
            {pending ?
                <progress className="progress w-full mt-2 bg-gray-600 h-[10px] progress-accent"></progress> : null}
        </div>
    </StyledGifSelector>;
};