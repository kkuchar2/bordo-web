import React, {useCallback, useRef} from 'react';

import {Button, Input, Text} from '@chakra-ui/react';
import {CloudArrowUpIcon} from '@heroicons/react/24/solid';
import {CenterFlex} from 'components/chakra/CenterFlex/CenterFlex';

import {ChangeAvatarModeSelectorProps} from './ChangeAvatarModeSelector.types';
import {StyledSelectGIFCircle} from './style';

export const ChangeAvatarModeSelector = (props: ChangeAvatarModeSelectorProps) => {

    const { translation, onFileSelected, onAnimatedAvatarSelected } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const openFileSelectionWindow = useCallback(() => {
        inputRef.current?.click();
    }, [inputRef]);

    return <CenterFlex gap={'20px'}>
        <CenterFlex direction={'column'} gap={'20px'}>
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
            <Text>{translation('UPLOAD_IMAGE')}</Text>
        </CenterFlex>

        <CenterFlex direction={'column'} gap={'20px'}>
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
            <Text>{translation('ANIMATED_AVATAR')}</Text>
        </CenterFlex>
    </CenterFlex>;
};
