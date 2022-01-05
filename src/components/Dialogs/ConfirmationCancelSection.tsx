import React, {useCallback} from "react";

import {Button} from "kuchkr-react-component-library";
import {TFunction} from "react-i18next";

import {cancelButtonTheme, confirmButtonTheme} from "./commonStyles";
import {StyledDialogButtonsSection} from "./style";

export interface ConfirmationCancelSectionProps {
    onConfirm?: (e: Event) => void,
    onCancel: (e: Event) => void,
    translation: TFunction<"translation">,
    confirmDisabled: boolean
}

export const ConfirmationCancelSection = (props: ConfirmationCancelSectionProps) => {

    const {onConfirm, onCancel, translation, confirmDisabled} = props;

    const onConfirmPressed = useCallback((v) => {
        onConfirm?.(v);
    }, [onConfirm]);

    const onCancelPressed = useCallback((v) => {
        onCancel?.(v);
    }, [onCancel]);

    return <StyledDialogButtonsSection>
        <Button theme={cancelButtonTheme} text={translation('CANCEL')} onClick={onCancelPressed} disabled={false}/>
        <Button theme={confirmButtonTheme} text={translation('CONFIRM')} onClick={onConfirmPressed}
                disabled={confirmDisabled}/>
    </StyledDialogButtonsSection>;
};