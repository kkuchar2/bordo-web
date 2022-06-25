import React, {useCallback, useRef} from "react";

import {
    ChangeAvatarModeSelectorProps
} from "components/DialogSystem/dialogs/ChangeAvatarDialog/ChangeAvatarModeSelector/ChangeAvatarModeSelector.types";
import {Button, Text} from "kuchkr-react-component-library";

import {
    StyledModeSelector,
    StyledSelectGifButtonContent, StyledSelectGIFCircle,
    StyledUploadButtonCircle,
    StyledUploadButtonContent,
    uploadButtonTheme, uploadFileTextTheme
} from "./style";

export const ChangeAvatarModeSelector = (props: ChangeAvatarModeSelectorProps) => {

    const {translation, onFileSelected, onAnimatedAvatarSelected} = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const openFileSelectionWindow = useCallback(() => {
        inputRef.current?.click();
    }, [inputRef]);

    return <StyledModeSelector>
        <Button theme={uploadButtonTheme} style={{ zIndex: 1000, padding: 0 }} onClick={openFileSelectionWindow}>
            <StyledUploadButtonContent>
                <StyledUploadButtonCircle>
                    <img src={"assets/images/picture_add_icon_white.png"} width={30} alt={'avatar'}/>
                </StyledUploadButtonCircle>
                <Text theme={uploadFileTextTheme} text={translation("UPLOAD_IMAGE")}/>
            </StyledUploadButtonContent>
        </Button>

        <Button theme={uploadButtonTheme} style={{ zIndex: 1000, padding: 0 }} onClick={onAnimatedAvatarSelected}>
            <StyledSelectGifButtonContent>
                <StyledSelectGIFCircle url={"https://media3.giphy.com/media/lgcUUCXgC8mEo/giphy.gif?"}/>
                <Text theme={uploadFileTextTheme} text={translation("ANIMATED_AVATAR")}/>
            </StyledSelectGifButtonContent>
        </Button>

        <input type='file'
               accept='image/*'
               ref={inputRef}
               onChange={onFileSelected}
               style={{ display: "none" }}/>
    </StyledModeSelector>;
};
