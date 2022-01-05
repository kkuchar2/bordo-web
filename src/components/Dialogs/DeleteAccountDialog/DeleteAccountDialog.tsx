import React from "react";

import {ConfirmationCancelSection} from "components/Dialogs/ConfirmationCancelSection";
import {BaseDialogProps} from "components/Dialogs/types";
import {useTranslation} from "react-i18next";

export interface DeleteDialogProps extends BaseDialogProps {
    onConfirm: (e: Event) => void,
    onCancel: (e: Event) => void
}

export const DeleteAccountDialog = (props: DeleteDialogProps) => {

    const {onConfirm, onCancel} = props;

    const {t} = useTranslation();

    return <ConfirmationCancelSection onCancel={onCancel} onConfirm={onConfirm} translation={t}
                                      confirmDisabled={false}/>;
};