import React, { useCallback, useRef } from 'react';

import { Button, Input } from '@chakra-ui/react';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

import { ChangeAvatarModeSelectorProps } from './ChangeAvatarModeSelector.types';
import { StyledSelectGIFCircle } from './style';

export const ChangeAvatarModeSelector = (props: ChangeAvatarModeSelectorProps) => {

    const { onFileSelected, onAnimatedAvatarSelected } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const { t } = useTranslation();

    const openFileSelectionWindow = useCallback(() => {
        inputRef.current?.click();
    }, [inputRef]);

    return <div className={'flex items-center justify-center gap-[20px]'}>
        <div className={'flex flex-col items-center justify-center gap-[20px]'}>
            <Button onClick={openFileSelectionWindow}
                borderRadius={'full'}
                width={'150px'}
                height={'150px'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
                gap={'20px'}>

                <CloudArrowUpIcon width={40} color={'#a5a5a5'}/>
            </Button>
            <Input type={'file'} accept={'image/*'} ref={inputRef} onChange={onFileSelected}
                style={{ display: 'none' }}/>
            <div className={'font-semibold'}>
                {t('UPLOAD_IMAGE')}
            </div>
        </div>

        <div className={'flex flex-col items-center justify-center gap-[20px]'}>
            <Button onClick={onAnimatedAvatarSelected}
                borderRadius={'full'}
                width={'150px'}
                height={'150px'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
                gap={'20px'}>

                <StyledSelectGIFCircle url={'https://media3.giphy.com/media/lgcUUCXgC8mEo/giphy.gif?'}/>
            </Button>
            <div className={'font-semibold'}>
                {t('ANIMATED_AVATAR')}
            </div>
        </div>
    </div>;
};
