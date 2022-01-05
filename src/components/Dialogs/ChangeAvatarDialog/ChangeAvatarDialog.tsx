import React, {createRef, useCallback, useState} from "react";

import {tryChangeProfileImage} from "appRedux/reducers/api/account";
import {useAppDispatch} from "appRedux/store";
import {ConfirmationCancelSection} from "components/Dialogs/ConfirmationCancelSection";
import {BaseDialogProps} from "components/Dialogs/types";
import {Button, Slider, Text} from "kuchkr-react-component-library";
import Cropper from "react-easy-crop";
import {useTranslation} from "react-i18next";
import {v4 as uuidv4} from 'uuid';

import {generateCroppedImageFile} from "./cropImage";
import {
    CropContainer,
    sliderTheme,
    SliderWithIcons,
    StyledChangeAvatarDialog,
    StyledUploadButtonCircle,
    StyledUploadButtonContent,
    uploadButtonTheme,
    uploadFileTextTheme
} from "./style";

export interface ChangeAvatarDialogProps extends BaseDialogProps {
    onConfirm: (e: Event) => void,
    onCancel: (e: Event) => void
}

export const ChangeAvatarDialog = (props: ChangeAvatarDialogProps) => {

    const {onConfirm, onCancel} = props;

    const inputRef = createRef<HTMLInputElement>();

    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [extension, setExtension] = useState('.png');

    const [croppedArea, setCroppedArea] = useState(null);
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);

    const {t} = useTranslation();

    const dispatch = useAppDispatch();

    const triggerFileSelectPopup = useCallback(() => {
        inputRef.current?.click();
    }, [inputRef]);

    const changeAvatar = useCallback((e: Event) => {
        if (extension === '.gif') {
            const blob = file.slice(0, file.size, 'image/gif');
            const newFile = new File([blob], `${uuidv4()}.gif`, {type: 'image/gif'});
            dispatch(tryChangeProfileImage(newFile));
            onConfirm?.(e);
        } else {
            generateCroppedImageFile(image, croppedArea, blob => {
                const file = new File([blob], ` ${uuidv4()}${extension}`);
                dispatch(tryChangeProfileImage(file));
                onConfirm?.(e);
            });
        }

    }, [onConfirm, image, croppedArea, extension]);

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };

    const onSelectFile = useCallback((event) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const reader = new FileReader();
            const file = files[0];
            const ext = file.name.split('.').pop();
            setFile(file);
            setExtension(`.${ext}`);

            if (ext !== '.gif') {
                reader.readAsDataURL(file);
                reader.addEventListener("load", () => setImage(reader.result));
            }
        }
    }, []);

    const onZoomChange = useCallback((v) => {
        setZoom(v);
    }, []);

    const renderContent = useCallback(() => {
        if (!image) {
            return <Button theme={uploadButtonTheme} style={{zIndex: 1000}} onClick={triggerFileSelectPopup}>
                <StyledUploadButtonContent>
                    <StyledUploadButtonCircle>
                        <img src={"assets/images/picture_add_icon_white.png"} width={40} alt={'avatar'}/>
                    </StyledUploadButtonCircle>
                    <Text theme={uploadFileTextTheme} text={t("UPLOAD_FILE")}/>
                </StyledUploadButtonContent>
            </Button>;
        }

        return <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            cropShape="round"
            aspect={1}
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}>
        </Cropper>;
    }, [image, zoom, crop]);

    const renderSlider = useCallback(() => {
        if (!image || extension == '.gif') {
            return null;
        }

        return <SliderWithIcons>
            <img style={{marginRight: 15, marginBottom: 7}} src={"assets/images/picture_icon.png"} width={20}
                 alt={'sliderIconSmall'}/>
            <Slider value={zoom}
                    min={1}
                    max={3}
                    step={0.01}
                    useMarks={false}
                    onChange={onZoomChange}
                    innerModernSlider={true}
                    theme={sliderTheme}/>
            <img style={{marginLeft: 15, marginBottom: 8}} src={"assets/images/picture_icon.png"} width={30}
                 alt={'sliderIconBig'}/>
        </SliderWithIcons>;
    }, [image, zoom, extension]);

    return <StyledChangeAvatarDialog>
        <CropContainer imageSelected={image != null}>
            {renderContent()}
        </CropContainer>

        {renderSlider()}

        <div className='container-buttons'>
            <input
                type='file'
                accept='image/*'
                ref={inputRef}
                onChange={onSelectFile}
                style={{display: "none"}}
            />
        </div>

        <ConfirmationCancelSection onCancel={onCancel} onConfirm={changeAvatar} translation={t}
                                   confirmDisabled={image === null}/>
    </StyledChangeAvatarDialog>;
};