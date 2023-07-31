import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { IGif } from '@giphy/js-types';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { ChangeAvatarModeSelector } from './ChangeAvatarModeSelector/ChangeAvatarModeSelector';
import { generateCroppedImageFile } from './cropImage';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import { Crop } from '@/components/Image/Crop/Crop';
import { GIFSelect } from '@/components/Image/GIFSelect/GIFSelect';
import { giphyFetch } from '@/config';
import { changeAvatar, signAvatarUploadUrl } from '@/queries/account';
import { SignedAvatarUploadInfo, SignedUrl } from '@/queries/account/types';
import { changeDialog, closeDialog } from '@/state/reducers/dialog/dialogSlice';
import { DialogProps } from '@/state/reducers/dialog/dialogSlice.types';
import { useAppDispatch } from '@/state/store';

const FILE_SIZE_LIMIT_BYTES = 5 * 1024 * 1024;

type ChangeAvatarMode = 'upload' | 'gif' | null;

export const ChangeAvatarDialog = (props: DialogProps) => {
    const { t } = useTranslation();

    const [file, setFile] = useState(null);
    const [mode, setMode] = useState<ChangeAvatarMode>(null);
    const [image, setImage] = useState(null);
    const [extension, setExtension] = useState('.png');

    const [croppedArea, setCroppedArea] = useState(null);

    const dispatch = useAppDispatch();

    const changeAvatarQuery = changeAvatar();

    const requestSignedUrlQuery = signAvatarUploadUrl()({
        onSuccess: (data: SignedAvatarUploadInfo) => {
            const { signed_url, file_path } = data;

            if (!signed_url) {
                return;
            }

            if (mode === 'upload') {
                generateCroppedImageFile(image, croppedArea)
                    .then((blob) => {
                        console.log('Blob generated: ', blob);
                        uploadToStaticStorage(blob, signed_url, file_path)
                            .then(() => {
                                console.log('File uploaded successfully');
                            })
                            .catch((error) => {
                                console.error('Error uploading file: ', error);
                            });
                    })
                    .catch((error) => {
                        console.error('Error generating blob: ', error);
                    });
            }
        }
    });

    const validateBlobSize = useCallback((blob: Blob) => {
        return blob.size <= FILE_SIZE_LIMIT_BYTES;
    }, []);

    const uploadToStaticStorage = useCallback(async (blob: Blob, signedUrl: SignedUrl, file_path: string) => {

        const fields = signedUrl.fields;

        const formData = new FormData();
        Object.keys(fields).forEach((key) => formData.append(key, fields[key]));
        formData.append('file', blob);

        await axios.post(signedUrl.url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((response) => {
                changeAvatarQuery.mutate({ avatar: file_path });
            });
    }, [extension]);

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
            changeAvatarQuery.mutate({
                avatar: `https://media.giphy.com/media/${gif.id}/giphy.gif`,
            });
        }, []);

    const gifSearchOrCropContainer = useMemo(() => {
        if (mode === 'upload') {
            return <Crop image={image} onCroppedAreaChange={setCroppedArea}/>;
        }
        else if (mode === 'gif') {
            return <GIFSelect
                giphyFetch={giphyFetch}
                onGifSelected={onGifSelected}
                pending={changeAvatarQuery.isLoading}/>;
        }
    }, [mode, image, onGifSelected, changeAvatarQuery.isLoading]);

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
        dispatch(closeDialog());
    }, []);

    const onConfirmClick = useCallback(() => {
        if (extension === '.gif') {
            const blob = file.slice(0, file.size, 'image/gif');

            // Validate size on client side
            const isCorrectSize = validateBlobSize(blob);

            if (!isCorrectSize) {
                console.error('File is too big');
                return;
            }
        }
        console.log('Requesting signed url');
        requestSignedUrlQuery.mutate({ file_extension: extension.slice(1) });
    }, [image, croppedArea, extension, file, uploadToStaticStorage]);

    useEffect(() => {
        if (!requestSignedUrlQuery.isSuccess) {
            return;
        }

    }, [requestSignedUrlQuery]);

    const renderButtons = useMemo(() => {
        if (mode === 'upload') {
            return <div className={'w-fill flex justify-end gap-[20px]'}>
                <button
                    className={'min-w-[120px] rounded-md bg-neutral-800 p-2 hover:bg-neutral-600'}
                    onClick={onCancelClick}
                    disabled={false}>
                    {t('CANCEL')}
                </button>
                <button
                    className={'min-w-[120px] rounded-md bg-neutral-800 p-2 hover:bg-neutral-600'}
                    onClick={onConfirmClick} disabled={false}>
                    {t('CONFIRM')}
                </button>
            </div>;
        }
    }, [mode, image, croppedArea, onCancelClick, onConfirmClick]);

    return <div className={!mode ? 'max-w-[400px]' : 'w-[500px]'}>
        {!mode && <ChangeAvatarModeSelector
            translation={t}
            onFileSelected={onFileSelected}
            onAnimatedAvatarSelected={onAnimatedAvatarSelect}/>}

        {gifSearchOrCropContainer}
        {renderButtons}
        <DelayedTransition pending={changeAvatarQuery.isLoading}/>
    </div>;
};
