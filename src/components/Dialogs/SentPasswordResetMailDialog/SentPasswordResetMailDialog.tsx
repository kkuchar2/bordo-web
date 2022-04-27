import React from "react";

import {confirmButtonTheme} from "components/Dialogs/commonStyles";
import {DialogProps} from "components/Dialogs/types";
import {Button} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";

import {StyledDialogButtonsSection} from "./style";

export interface SentPasswordResetMailDialogProps extends DialogProps {
    onGoHome: (e: Event) => void
}

export const SentPasswordResetMailDialog = (props: SentPasswordResetMailDialogProps) => {

    const {onGoHome} = props;

    const {t} = useTranslation();

    return <StyledDialogButtonsSection>
        <Button theme={confirmButtonTheme} text={t('SIGN_IN')} onClick={onGoHome}/>
    </StyledDialogButtonsSection>;
};