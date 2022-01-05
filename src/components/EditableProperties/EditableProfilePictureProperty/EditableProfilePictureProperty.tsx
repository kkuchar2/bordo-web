import React, {useCallback, useEffect, useState} from "react";

import {useMediaQuery} from "@material-ui/core";
import {selectorAuth, tryChangeProfileImage} from "appRedux/reducers/api/account";
import {useAppDispatch} from "appRedux/store";
import {showChangeAvatarDialog} from "components/Dialogs/readyDialogs";
import {Spinner} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

import {
    PropertyValueSection,
    spinnerTheme,
    StyledEditableProfilePictureProperty,
    StyledOverlay,
    StyledProfilePicture,
    StyledPropertyValues,
    StyledUserActiveIndicator
} from "./style";

export interface ProfilePictureProps {
    active?: boolean;
    useActiveIndicator?: boolean;
    pictureSize?: number;
    useImageUpload?: boolean;
}

const EditableProfilePictureProperty = (props: ProfilePictureProps) => {

    const {active, useActiveIndicator, pictureSize, useImageUpload} = props;

    const [selectedFile, setSelectedFile] = useState(null);
    const [randomKey, setRandomKey] = useState(Date.now());
    const [overlayOn, setOverlayOn] = useState(false);

    const dispatch = useAppDispatch();

    const authState = useSelector(selectorAuth);

    const isMobile = useMediaQuery('(max-width: 600px)');

    const {t} = useTranslation();

    const onChangeImageClick = useCallback(() => {
        if (!useImageUpload) {
            return;
        }

        showChangeAvatarDialog(dispatch, t);

    }, [useImageUpload]);

    const onFileSelected = useCallback(() => {
        if (!selectedFile) {
            return;
        }
        dispatch(tryChangeProfileImage(selectedFile));
        setRandomKey(Date.now());
    }, [selectedFile]);

    const onFileChange = useCallback((e) => {
        setSelectedFile(e.target.files[0]);
    }, []);

    useEffect(() => onFileSelected(), [selectedFile]);

    const onShowOverlay = useCallback(() => {
        setOverlayOn(true);
    }, []);

    const onHideOverlay = useCallback(() => {
        setOverlayOn(false);
    }, []);

    const renderActiveIndicator = useCallback(() => {
        if (!useActiveIndicator) {
            return null;
        }
        return <StyledUserActiveIndicator active={active}/>;
    }, [active, useActiveIndicator]);

    const renderOverlayText = useCallback((overlayOn) => {
        if (!overlayOn) {
            return null;
        }
        return <img style={{opacity: 0.5}} src={"assets/images/picture_add_icon_white.png"} width={40} alt={'avatar'}/>;
    }, []);

    const renderOverlay = useCallback(() => {
        if (!useImageUpload) {
            return null;
        }
        return <StyledOverlay onMouseEnter={onShowOverlay} onMouseLeave={onHideOverlay}>
            {renderOverlayText(overlayOn)}
        </StyledOverlay>;
    }, [useImageUpload, overlayOn]);

    const renderProfilePicture = useCallback(() => {
        const path = authState.path;
        const correctContext = path === 'changeProfileImage';
        const isRequestPending = authState.requestState.pending;
        const avatar = authState.user.avatar;

        return <StyledProfilePicture
            url={isRequestPending && correctContext ? "" : avatar}
            size={pictureSize}
            onClick={onChangeImageClick}>
            {isRequestPending && correctContext ? <Spinner theme={spinnerTheme} text={''}/> : null}
            {renderActiveIndicator()}
            {renderOverlay()}
        </StyledProfilePicture>;
    }, [authState, isMobile, randomKey, active, overlayOn]);

    return <StyledEditableProfilePictureProperty enableUpload={useImageUpload}>
        <StyledPropertyValues>
            <PropertyValueSection>
                {renderProfilePicture()}
            </PropertyValueSection>
        </StyledPropertyValues>
    </StyledEditableProfilePictureProperty>;
};

EditableProfilePictureProperty.defaultProps = {
    isActive: false,
    useActiveIndicator: true,
    pictureSize: 80,
    useImageUpload: false
};

export default EditableProfilePictureProperty;