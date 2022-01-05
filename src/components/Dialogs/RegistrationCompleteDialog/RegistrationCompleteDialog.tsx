import React from "react";

import {confirmButtonTheme} from "components/Dialogs/commonStyles";
import {BaseDialogProps} from "components/Dialogs/types";
import {Button} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";

import {StyledDialogButtonsSection} from "./style";

export interface RegistrationCompleteDialogProps extends BaseDialogProps {
    onGoHome: (e: Event) => void
}

export const RegistrationCompleteDialog = (props: RegistrationCompleteDialogProps) => {

    const {onGoHome} = props;

    const {t} = useTranslation();

    return <StyledDialogButtonsSection>
        <Button theme={confirmButtonTheme} text={t('SIGN_IN')} onClick={onGoHome}/>
    </StyledDialogButtonsSection>;
};