import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {IGif} from '@giphy/js-types';
import {Crop} from 'components/Image/Crop/Crop';
import {GIFSelect} from 'components/Image/GIFSelect/GIFSelect';
import {useTranslation} from 'react-i18next';
import {useSelector} from "react-redux";
import {changeDialogTitle, closeDialog} from "state/reducers/dialog/dialogSlice";
import {DialogProps} from "state/reducers/dialog/dialogSlice.types";
import {changeAnimatedAvatar, changeAvatar, resetAccountSliceRequestState} from 'state/services/accountService';
import {RootState, useAppDispatch} from "state/store";
import {v4 as uuidv4} from 'uuid';

import {isFailure, isSuccess} from '../../../../api/api_util';
import {giphyFetch} from '../../../../api/config';

import {ChangeAvatarModeSelector} from './ChangeAvatarModeSelector/ChangeAvatarModeSelector';
import {generateCroppedImageFile} from './cropImage';

const FILE_SIZE_LIMIT_BYTES = 5 * 1024 * 1024;

export const ChangeAvatarDialog = (props: DialogProps) => {
    const { onConfirm, onCancel } = props.dialog;

    const [file, setFile] = useState(null);
    const [mode, setMode] = useState(null);
    const [image, setImage] = useState(null);
    const [extension, setExtension] = useState('.png');

    const [pending, setPending] = useState(false);

    const [croppedArea, setCroppedArea] = useState(null);

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const changeAvatarState = useSelector((state: RootState) => state.account.requests.changeAvatar);
    const changeAnimatedAvatarState = useSelector((state: RootState) => state.account.requests.changeAnimatedAvatar);

    useEffect(() => {
        return () => {
            dispatch(resetAccountSliceRequestState('changeAvatar'));
            dispatch(resetAccountSliceRequestState('changeAnimatedAvatar'));
        };
    }, []);

    useEffect(() => {
        if (isSuccess(changeAvatarState)) {
            setPending(false);
            dispatch(closeDialog());
        }
        else if (isFailure(changeAvatarState)) {
            setPending(false);
        }
    }, [changeAvatarState]);

    useEffect(() => {
        if (isSuccess(changeAnimatedAvatarState)) {
            setPending(false);
            dispatch(closeDialog());
        }
        else if (isFailure(changeAnimatedAvatarState)) {
            setPending(false);
        }
    }, [changeAnimatedAvatarState]);

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
            dispatch(changeAvatar(new File([blob], ` ${uuidv4()}${extension}`)));
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

            setPending(true);
            dispatch(changeAvatar(new File([blob], `${uuidv4()}.gif`, { type: 'image/gif' })));
        }
        else {
            setPending(true);
            generateCroppedImageFile(image, croppedArea, sendChangeProfileImage);
        }
    }, [image, croppedArea, extension, file, sendChangeProfileImage]);

    useEffect(() => {
        if (image) {
            dispatch(changeDialogTitle('Edit image'));
        }
    }, [image]);

    const onGifSelected = useCallback(
        (gif: IGif) => {
            setPending(true);
            dispatch(changeAnimatedAvatar(`https://media.giphy.com/media/${gif.id}/giphy.gif`));
        },
        [pending]
    );

    const renderError = useMemo(() => {
        if (isFailure(changeAvatarState)) {
            if (changeAvatarState.info.errors.responseError.detail?.avatar) {
                return <div className={'error'}>{changeAvatarState.info.errors.responseError.detail?.avatar[0]}</div>;
            }
        }
    }, [changeAvatarState]);

    const renderGIFSearchOrCropContainer = useMemo(() => {
        if (mode === 'upload') {
            return <Crop className={'mt-[20px]'} image={image} onCroppedAreaChange={setCroppedArea}/>;
        }
        else if (mode === 'gif') {
            return <GIFSelect giphyFetch={giphyFetch} onGifSelected={onGifSelected} pending={pending}/>;
        }
    }, [mode, image, onGifSelected, changeAnimatedAvatarState, pending]);

    const onAnimatedAvatarSelect = useCallback(() => {
        setMode('gif');
        dispatch(changeDialogTitle('GIF_SELECT_TITLE'));
    }, []);

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
            return (
                <div className={'flex w-full justify-end p-[20px]'}>
                    <button type={'button'} className={'cancelButton'} onClick={onCancelClick} disabled={false}>
                        {t('CANCEL')}
                    </button>
                    <button type={'button'} className={'confirmButton'} onClick={onChangeAvatar} disabled={false}>
                        {t('CONFIRM')}
                    </button>
                </div>
            );
        }
    }, [mode, image, croppedArea, onCancelClick, onConfirmClick]);

    return (
        <div>
            {mode === null ? (
                <ChangeAvatarModeSelector
                    translation={t}
                    onFileSelected={onFileSelected}
                    onAnimatedAvatarSelected={onAnimatedAvatarSelect}
                />
            ) : null}

            {renderGIFSearchOrCropContainer}
            {renderButtons}
            {renderError}
        </div>
    );
};
