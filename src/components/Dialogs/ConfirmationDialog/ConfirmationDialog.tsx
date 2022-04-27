import React from "react";

import {ConfirmationCancelSection} from "components/Dialogs/ConfirmationCancelSection";
import {DialogProps} from "components/Dialogs/types";
import {useTranslation} from "react-i18next";

export const ConfirmationDialog = (props: DialogProps) => {

    const {onConfirm, onCancel} = props.dialog;

    const {t} = useTranslation();

    return <ConfirmationCancelSection
        onCancel={onCancel}
        onConfirm={onConfirm}
        translation={t}
        confirmDisabled={false}/>;
};