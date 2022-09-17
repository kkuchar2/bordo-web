import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {Box, Button, Flex} from '@chakra-ui/react';
import {IGif} from '@giphy/js-types';
import {DelayedTransition} from 'components/chakra/DelayedTransition/DelayedTransition';
import {Crop} from 'components/Image/Crop/Crop';
import {GIFSelect} from 'components/Image/GIFSelect/GIFSelect';
import {useTranslation} from 'react-i18next';
import {changeDialog} from 'state/reducers/dialog/dialogSlice';
import {DialogProps} from 'state/reducers/dialog/dialogSlice.types';
import {useAppDispatch} from 'state/store';

import {giphyFetch} from '../../../../api/config';
import {changeAnimatedAvatar, changeAvatar} from '../../../../queries/account';

import {ChangeAvatarModeSelector} from './ChangeAvatarModeSelector/ChangeAvatarModeSelector';
import {generateCroppedImageFile} from './cropImage';

const FILE_SIZE_LIMIT_BYTES = 5 * 1024 * 1024;

export const ChangeAvatarDialog = (props: DialogProps) => {
    const { onConfirm, onCancel } = props.dialog;

    const { t } = useTranslation();

    const [file, setFile] = useState(null);
    const [mode, setMode] = useState(null);
    const [image, setImage] = useState(null);
    const [extension, setExtension] = useState('.png');

    const [croppedArea, setCroppedArea] = useState(null);

    const dispatch = useAppDispatch();

    const {
        isIdle: changeAvatarIdle,
        isLoading: changeAvatarIsPending,
        isError: changeAvatarIsError,
        error: changeAvatarError,
        isSuccess: changeAvatarSuccess,
        mutate: changeAvatarMutate
    } = changeAvatar();

    const {
        isIdle: changeAnimatedAvatarIdle,
        isLoading: changeAnimatedAvatarIsPending,
        isError: changeAnimatedAvatarIsError,
        error: changeAnimatedAvatarError,
        isSuccess: changeAnimatedAvatarSuccess,
        mutate: changeAnimatedAvatarMutate
    } = changeAnimatedAvatar();

    const validateBlobSize = useCallback((blob: Blob) => {
        return blob.size <= FILE_SIZE_LIMIT_BYTES;
    }, []);

    const sendChangeProfileImage = useCallback(
        (blob: Blob) => {
            const isCorrectSize = validateBlobSize(blob);

            if (!isCorrectSize) {
                console.error('File is too big');
                // TODO: show error
                return;
            }
            //changeAvatarMutate(new File([blob], ` ${uuidv4()}${extension}`)));
        },
        [extension]
    );

    const onChangeAvatar = useCallback(() => {
        if (extension === '.gif') {
            const blob = file.slice(0, file.size, 'image/gif');

            const isCorrectSize = validateBlobSize(blob);

            if (!isCorrectSize) {
                console.error('File is too big');
                // TODO: show error
                return;
            }
            //changeAvatarMutate(new File([blob], `${uuidv4()}.gif`, { type: 'image/gif' })));
        }
        else {
            generateCroppedImageFile(image, croppedArea, sendChangeProfileImage);
        }
    }, [image, croppedArea, extension, file, sendChangeProfileImage]);

    const onBack = useCallback(() => {
        setMode(null);
        dispatch(changeDialog('CHANGE_AVATAR', 400, false, null));
    }, []);

    useEffect(() => {
        if (image) {
            dispatch(changeDialog('EDIT_IMAGE', 500, true, onBack));
        }
    }, [image, onBack]);

    const onGifSelected = useCallback(
        (gif: IGif) => {
            changeAnimatedAvatarMutate({
                animated_avatar: `https://media.giphy.com/media/${gif.id}/giphy.gif`,
                use_animated_avatar: true
            });
        }, []);

    const gifSearchOrCropContainer = useMemo(() => {
        if (mode === 'upload') {
            return <Crop image={image} onCroppedAreaChange={setCroppedArea}/>;
        }
        else if (mode === 'gif') {
            return <GIFSelect giphyFetch={giphyFetch} onGifSelected={onGifSelected}
                              pending={changeAnimatedAvatarIsPending}/>;
        }
    }, [mode, image, onGifSelected, changeAnimatedAvatarIsPending]);

    const onAnimatedAvatarSelect = useCallback(() => {
        setMode('gif');
        dispatch(changeDialog('GIF_SELECT_TITLE', 500, true, onBack));
    }, [onBack]);

    const onFileSelected = useCallback((e) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            const reader = new FileReader();
            const file = files[0];
            const ext = file.name.split('.').pop();
            setFile(file);
            setMode('upload');
            setExtension(`.${ext}`);

            if (ext !== '.gif') {
                reader.readAsDataURL(file);
                reader.addEventListener('load', () => setImage(reader.result));
            }
        }

        setFile(file);
    }, []);

    const onCancelClick = useCallback(() => {
        if (onCancel) {
            onCancel();
        }
    }, [onCancel]);

    const onConfirmClick = useCallback(() => {
        if (onConfirm) {
            onConfirm();
        }
    }, [onConfirm]);

    const renderButtons = useMemo(() => {
        if (mode === 'upload') {
            return <Flex w={'100%'} justify={'flex-end'} gap={'20px'}>
                <Button onClick={onCancelClick} disabled={false}>{t('CANCEL')}</Button>
                <Button onClick={onChangeAvatar} disabled={false}>{t('CONFIRM')}</Button>
            </Flex>;
        }
    }, [mode, image, croppedArea, onCancelClick, onConfirmClick]);

    return <Box>
        {!mode && <ChangeAvatarModeSelector
            translation={t}
            onFileSelected={onFileSelected}
            onAnimatedAvatarSelected={onAnimatedAvatarSelect}/>}

        {gifSearchOrCropContainer}
        {renderButtons}
        <DelayedTransition pending={changeAvatarIsPending || changeAnimatedAvatarIsPending}/>
    </Box>;
};
