import React, {useCallback, useEffect, useMemo, useState} from "react";

import {IGif} from "@giphy/js-types";
import {
    getChangeAnimatedAvatarState,
    getChangeAvatarState,
    resetUserSliceRequestState
} from "appRedux/reducers/api/user/userSlice";
import {changeDialogTitle, closeDialog} from "appRedux/reducers/application";
import {changeAnimatedAvatar, changeAvatar} from "appRedux/services/userService";
import {useAppDispatch} from "appRedux/store";
import {ConfirmationCancelSection} from "components/Dialogs/ConfirmationCancelSection";
import {DialogProps} from "components/Dialogs/types";
import {FormError} from "components/Errors/FormError/FormError";
import {Crop} from "components/Image/Crop/Crop";
import {GIFSelect} from "components/Image/GIFSelect/GIFSelect";
import {showSuccessToast} from "components/Toast/readyToastNotifications";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {v4 as uuidv4} from 'uuid';

import {isFailure, isSuccess} from "../../../api/api_util";
import {giphyFetch} from "../../../api/config";

import {ChangeAvatarModeSelector} from "./ChangeAvatarModeSelector/ChangeAvatarModeSelector";
import {generateCroppedImageFile} from "./cropImage";
import {StyledChangeAvatarDialog} from "./style";

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

    const changeAvatarState = useSelector(getChangeAvatarState);
    const changeAnimatedAvatarState = useSelector(getChangeAnimatedAvatarState);

    useEffect(() => {
        return () => {
            dispatch(resetUserSliceRequestState('changeAvatar'));
            dispatch(resetUserSliceRequestState('changeAnimatedAvatar'));
        };
    }, []);

    useEffect(() => {
        if (isSuccess(changeAvatarState)) {
            setPending(false);
            showSuccessToast("Successfully changed avatar");
            dispatch(closeDialog());
        }
        else if (isFailure(changeAvatarState)) {
            setPending(false);
        }
    }, [changeAvatarState]);

    useEffect(() => {
        if (isSuccess(changeAnimatedAvatarState)) {
            setPending(false);
            showSuccessToast("Successfully changed avatar");
            dispatch(closeDialog());
        }
        else if (isFailure(changeAnimatedAvatarState)) {
            setPending(false);
        }
    }, [changeAnimatedAvatarState]);

    const onChangeAvatar = useCallback((e: Event) => {
        console.log('File selected: ', e);
        if (extension === '.gif') {
            const blob = file.slice(0, file.size, 'image/gif');

            const isCorrectSize = validateBlobSize(blob);

            if (!isCorrectSize) {
                console.error('File is too big');
                return;
            }

            setPending(true);
            dispatch(changeAvatar(new File([blob], `${uuidv4()}.gif`, { type: 'image/gif' })));
        }
        else {
            setPending(true);
            generateCroppedImageFile(image, croppedArea, sendChangeProfileImage);
        }

    }, [onConfirm, image, croppedArea, extension, file]);

    const validateBlobSize = useCallback((blob: Blob) => {
        return blob.size <= FILE_SIZE_LIMIT_BYTES;
    }, []);

    const sendChangeProfileImage = useCallback((blob: Blob) => {
        const isCorrectSize = validateBlobSize(blob);

        if (!isCorrectSize) {
            console.error('File is too big');
            return;
        }
        dispatch(changeAvatar(new File([blob], ` ${uuidv4()}${extension}`)));
    }, [extension]);

    useEffect(() => {
        if (image) {
            dispatch(changeDialogTitle("Edit image"));
        }
    }, [image]);

    const onGifSelected = useCallback((gif: IGif) => {
        setPending(true);
        dispatch(changeAnimatedAvatar(`https://media.giphy.com/media/${gif.id}/giphy.gif`));
    }, [pending]);

    const renderError = useMemo(() => {
        if (isFailure(changeAvatarState)) {
            if (changeAvatarState.info.errors.responseError.detail?.avatar) {
                return <FormError error={changeAvatarState.info.errors.responseError.detail?.avatar[0]}/>;
            }
        }
    }, [changeAvatarState]);

    const renderGIFSearchOrCropContainer = useMemo(() => {
        if (mode === 'upload') {
            return <Crop image={image} onCroppedAreaChange={setCroppedArea}/>;
        }
        else if (mode === 'gif') {
            return <GIFSelect giphyFetch={giphyFetch} onGifSelected={onGifSelected} pending={pending}/>;
        }
    }, [mode, image, onGifSelected, changeAnimatedAvatarState, pending]);

    const onAnimatedAvatarSelect = useCallback((e) => {
        setMode('gif');
        dispatch(changeDialogTitle("Choose GIF"));
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
                reader.addEventListener("load", () => setImage(reader.result));
            }
        }

        setFile(file);
    }, []);

    const renderConfirmationCancelSection = useMemo(() => {
        if (mode === 'gif')
        {
            return null;
        }

        return <ConfirmationCancelSection
            onCancel={onCancel}
            onConfirm={onChangeAvatar}
            translation={t}
            hide={mode === null}
            waiting={pending}
            confirmDisabled={image === null || pending}/>;
    }, [mode, onCancel, onChangeAvatar, t, pending, image]);

    return <StyledChangeAvatarDialog>

        {mode === null ? <ChangeAvatarModeSelector
            translation={t}
            onFileSelected={onFileSelected}
            onAnimatedAvatarSelected={onAnimatedAvatarSelect}/> : null}

        {renderGIFSearchOrCropContainer}
        {renderError}
        {renderConfirmationCancelSection}

    </StyledChangeAvatarDialog>;
};