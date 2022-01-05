import React, {useCallback, useEffect, useState} from "react";

import {
    selectorAuth,
    selectorChangePassword,
    tryResetChangePasswordState,
    trySendChangePassword
} from "appRedux/reducers/api/account";
import {closeDialog} from "appRedux/reducers/application";
import {useAppDispatch} from "appRedux/store";
import {StyledChangePasswordDialogForm} from "components/Dialogs/ChangePasswordDialog/style";
import {cancelButtonTheme, confirmButtonTheme} from "components/Dialogs/commonStyles";
import {StyledDialogButtonsSection} from "components/Dialogs/style";
import {BaseDialogProps} from "components/Dialogs/types";
import {editInputTheme} from "components/EditableProperties/EditableTextProperty/style";
import {ErroredInput} from "components/ErroredInput/ErroredInput";
import {FormErrors} from "components/Forms/FormErrors/FormErrors";
import {Button} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

import {withRequestSuccess} from "../../../util";

export interface ChangePasswordDialogProps extends BaseDialogProps {
    onConfirm: (e: Event) => void,
    onCancel: (e: Event) => void
}

export const ChangePasswordDialog = (props: ChangePasswordDialogProps) => {

    const {onConfirm, onCancel} = props;

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');

    const [allowVisible, setAllowVisible] = useState(false);

    const onCurrentPasswordChange = useCallback(setCurrentPassword, []);
    const onNewPassword1Change = useCallback(setNewPassword1, []);
    const onNewPassword2Change = useCallback(setNewPassword2, []);

    const changePasswordState = useSelector(selectorChangePassword);
    const errors = changePasswordState.errors;

    const dispatch = useAppDispatch();

    const authState = useSelector(selectorAuth);

    const {t} = useTranslation();

    useEffect(() => {
        dispatch(tryResetChangePasswordState());
        setAllowVisible(true);
    }, []);

    const sendChangePassword = useCallback((e) => {
        e.preventDefault();
        dispatch(trySendChangePassword({
            currentEmail: authState.user.email,
            currentPassword: currentPassword,
            newPassword1: newPassword1,
            newPassword2: newPassword2
        }));
    }, [authState, currentPassword, newPassword1, newPassword2]);

    withRequestSuccess(changePasswordState, () => {
        console.log(changePasswordState);
        dispatch(tryResetChangePasswordState());
        dispatch(closeDialog());
    });

    const renderFormErrors = useCallback(() => {
        if (!errors || !allowVisible) {
            return null;
        }

        return <FormErrors errors={errors} translation={t}/>;
    }, [errors, allowVisible]);

    return <StyledChangePasswordDialogForm onSubmit={sendChangePassword}>
        <ErroredInput
            autoFocus={true}
            marginTop={0}
            theme={editInputTheme}
            id={"current_password"}
            type={'password'}
            title={`${t('CURRENT_PASSWORD')}:`}
            value={currentPassword}
            errors={errors}
            placeholder={t('CURRENT_PASSWORD_ENTER')}
            onChange={onCurrentPasswordChange}/>

        <ErroredInput
            marginTop={20}
            theme={editInputTheme}
            id={"new_password1"}
            title={`${t('NEW_PASSWORD')}:`}
            type={'password'}
            value={newPassword1}
            errors={errors}
            placeholder={t('NEW_PASSWORD_ENTER')}
            onChange={onNewPassword1Change}/>

        <ErroredInput
            marginTop={20}
            theme={editInputTheme}
            title={`${t('NEW_PASSWORD_CONFIRM')}:`}
            id={"new_password2"}
            type={'password'}
            value={newPassword2}
            errors={errors}
            placeholder={t('NEW_PASSWORD_CONFIRM')}
            onChange={onNewPassword2Change}/>

        {renderFormErrors()}

        <StyledDialogButtonsSection>
            <Button theme={cancelButtonTheme} text={t('CANCEL')} onClick={onCancel} disabled={false}/>
            <Button theme={confirmButtonTheme} type={'submit'} text={t('CONFIRM')}
                    disabled={currentPassword === '' || newPassword1 === '' || newPassword2 === ''}/>
        </StyledDialogButtonsSection>
    </StyledChangePasswordDialogForm>;
};