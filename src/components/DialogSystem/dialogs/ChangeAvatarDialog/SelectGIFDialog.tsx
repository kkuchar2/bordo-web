import { SyntheticEvent, useCallback, useEffect, useState } from 'react';

import { IGif } from '@giphy/js-types';
import Image from 'next/image';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import { GIFPresentation } from '@/components/Image/GIFSelect/GIFPresentation/GIFPresentation';
import { InputWithSmartLabel } from '@/components/InputWithSmartLabel/InputWithSmartLabel';
import { giphyFetch } from '@/config';
import { changeAvatar } from '@/queries/account';
import { closeDialog } from '@/state/reducers/dialog/dialogSlice';
import { DialogProps } from '@/state/reducers/dialog/dialogSlice.types';
import { useAppDispatch } from '@/state/store';

export type SelectGIFDialogProps = {}

export const SelectGIFDialog = (props: DialogProps<SelectGIFDialogProps>) => {

    const { dialog } = props;

    const [gifSearchText, setGifSearchText] = useState('');

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(dialog.maxWidth || 500);

    const changeAvatarQuery = changeAvatar();

    const dispatch = useAppDispatch();

    useEffect(() => {
        const onResize = () => {
            const windowWidth = window.innerWidth;
            const maxWidth = dialog.maxWidth || 500;
            let w = windowWidth < maxWidth ? windowWidth - 40 - 40 : maxWidth - 40;
            setWidth(w);
            setScreenWidth(windowWidth);
        };

        window.addEventListener('resize', onResize);
        onResize();

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [dialog.maxWidth]);

    useEffect(() => {
        if (changeAvatarQuery.isSuccess) {
            dispatch(closeDialog());
        }
    }, [changeAvatarQuery.isSuccess]);

    const onGifClick = useCallback((gif: IGif, e: SyntheticEvent<HTMLElement, Event>) => {
        if (changeAvatarQuery.isLoading) {
            return;
        }
        changeAvatarQuery.mutate({ avatar: `https://media.giphy.com/media/${gif.id}/giphy.gif` });
    }, [changeAvatarQuery.isLoading]);

    if (!giphyFetch) {
        console.error('Giphy fetch not initialized');
        return null;
    }

    return <div className={'relative flex-col overflow-hidden'}>
        <InputWithSmartLabel
            id={'gif_search'}
            name={'gifSearch'}
            type={'text'}
            isValid={true}
            value={gifSearchText}
            onChange={e => {
                setGifSearchText(e.target.value);
            }}
            label={'GIPHY_SEARCH_PLACEHOLDER'}/>
        <div className={'mt-[20px] w-full overflow-hidden rounded-md'}>
            <GIFPresentation
                width={width}
                screenWidth={screenWidth}
                onGifClick={onGifClick}
                searchText={gifSearchText}
                giphyFetch={giphyFetch}/>
        </div>
        <div className={'mt-[20px] flex w-full justify-end'}>
            <Image
                src={'/images/PoweredBy_Horizontal_Dark Backgrounds_With Logo.png'}
                width={120} height={100} alt={'powered_by_giphy'}/>
        </div>
        {changeAvatarQuery.isLoading && <div className={'mt-[20px]'}>
            <DelayedTransition pending={true}/>
        </div>}
    </div>;
};