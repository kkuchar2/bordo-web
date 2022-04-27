import React, {SyntheticEvent, useCallback, useState} from "react";

import {IGif} from "@giphy/js-types";
import {InputWithError} from "components/InputWithError/InputWithError";
import {FacebookCircularProgress} from "components/Progress/FacebookCircularProgress";

import {GIFPresentation} from "./GIFPresentation/GIFPresentation";
import {GIFSelectProps} from "./GIFSelect.types";
import {searchGifInputTheme, StyledGifSelector, StyledOverlay, StyledPendingOverlay} from "./style";

export const GIFSelect = (props: GIFSelectProps) => {

    const { searchText, onGifSelected, giphyFetch, pending } = props;

    const [gifSearchText, setGifSearchText] = useState('');

    const onGifClick = useCallback((gif: IGif, e: SyntheticEvent<HTMLElement, Event>) => {
        if (pending)
        {
            return;
        }
        onGifSelected?.(gif, e);
    }, [onGifSelected, pending]);

    return <StyledGifSelector>
        {pending ? <StyledPendingOverlay>
                <StyledOverlay />
                <FacebookCircularProgress style={{ zIndex: 1000 }}/>
            </StyledPendingOverlay> : null }
        <InputWithError
            autoFocus={false}
            theme={searchGifInputTheme}
            style={{ width: '100%', marginTop: 0 }}
            id={'gif_search'}
            title={''}
            type={'text'}
            autoComplete={'off'}
            errors={[]}
            withIcon={false}
            value={gifSearchText}
            onChange={e => setGifSearchText(e.target.value)}
            placeholder={'Search GIPHY'}/>
        <GIFPresentation onGifClick={onGifClick} searchText={gifSearchText} giphyFetch={giphyFetch}/>
    </StyledGifSelector>;
};