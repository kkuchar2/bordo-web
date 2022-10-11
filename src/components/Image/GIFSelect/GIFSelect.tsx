import React, {SyntheticEvent, useCallback, useState} from 'react';

import {Box, Flex, Image} from '@chakra-ui/react';
import {IGif} from '@giphy/js-types';
import {InputSmartLabel} from 'components/InputSmartLabel/InputSmartLabel';
import {useTranslation} from 'react-i18next';
import {useMeasure} from 'react-use';

import {GIFPresentation} from './GIFPresentation/GIFPresentation';
import {GIFSelectProps} from './GIFSelect.types';

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

    return <Flex direction={'column'} w={'100%'}>
        <InputSmartLabel
            id={'gif_search'}
            name={'gifSearch'}
            type={'text'}
            onChange={e => {
                setGifSearchText(e.target.value);
            }}
            label={t('GIPHY_SEARCH_PLACEHOLDER')}/>
        <Box mr={'20px'} ref={ref}>
            <GIFPresentation
                width={bounds.width}
                onGifClick={onGifClick}
                searchText={gifSearchText}
                giphyFetch={giphyFetch}/>
        </Box>
        <Flex w={'100%'} mt={3}>
            <Image src={'assets/images/powered_by_giphy.png'} w={150} alt={'gif'}/>
        </Flex>
    </Flex>;
};