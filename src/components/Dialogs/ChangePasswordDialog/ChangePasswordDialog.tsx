import React, {useCallback, useEffect, useState} from "react";

import {getChangePasswordState, getUserState, resetUserSliceRequestState} from "appRedux/reducers/api/user/userSlice";
import {closeDialog} from "appRedux/reducers/application";
import {changePassword} from "appRedux/services/userService";
import {useAppDispatch} from "appRedux/store";
import {StyledChangePasswordDialogFields, StyledChangePasswordDialogForm} from "components/Dialogs/ChangePasswordDialog/style";
import {cancelButtonTheme, confirmButtonTheme} from "components/Dialogs/commonStyles";
import {StyledDialogButtonsSection} from "components/Dialogs/style";
import {DialogProps} from "components/Dialogs/types";
import {editInputTheme} from "components/EditableProperties/EditableTextProperty/style";
import {FormErrors} from "components/Errors/FormErrors/FormErrors";
import {InputWithError} from "components/InputWithError/InputWithError";
import {Button} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

import {isSuccess} from "../../../api/api_util";

export const ChangePasswordDialog = (props: DialogProps) => {

    const { onConfirm, onCancel } = props.dialog;

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');

    const [allowVisible, setAllowVisible] = useState(false);

    const onCurrentPasswordChange = useCallback(setCurrentPassword, []);
    const onNewPassword1Change = useCallback(setNewPassword1, []);
    const onNewPassword2Change = useCallback(setNewPassword2, []);

    const changePasswordState = useSelector(getChangePasswordState);
    const errors = changePasswordState.info.errors;

    const dispatch = useAppDispatch();

    const userState = useSelector(getUserState);

    const { t } = useTranslation();

    useEffect(() => {
        //dispatch(tryResetChangePasswordState());
        setAllowVisible(true);
    }, []);

    const sendChangePassword = useCallback((e) => {
        e.preventDefault();
        dispatch(changePassword(userState.email.email, currentPassword, newPassword1, newPassword2));
    }, [userState, currentPassword, newPassword1, newPassword2]);

    useEffect(() => {
        return () => {
            dispatch(resetUserSliceRequestState('changePassword'));
        };
    }, []);

    useEffect(() => {
        if (isSuccess(changePasswordState)) {
            dispatch(closeDialog());
        }
    }, [changePasswordState]);

    const renderFormErrors = useCallback(() => {
        if (!errors || !allowVisible) {
            return null;
        }

        return <FormErrors errors={errors} translation={t}/>;
    }, [errors, allowVisible]);

    const onCancelRequest = useCallback((e) => {
        if (onCancel) {
            onCancel(e);
        }
        else {
            dispatch(closeDialog());
        }
    }, [onCancel]);

    return <StyledChangePasswordDialogForm onSubmit={sendChangePassword}>

        <StyledChangePasswordDialogFields>
            <InputWithError
                autoFocus={true}
                marginTop={0}
                theme={editInputTheme}
                id={"current_password"}
                type={'password'}
                title={`${t('CURRENT_PASSWORD')}:`}
                value={currentPassword}
                errors={errors}
                placeholder={t('CURRENT_PASSWORD_ENTER')}
                onChange={e => onCurrentPasswordChange(e.target.value)}/>

            <InputWithError
                marginTop={20}
                theme={editInputTheme}
                id={"new_password1"}
                title={`${t('NEW_PASSWORD')}:`}
                type={'password'}
                value={newPassword1}
                errors={errors}
                placeholder={t('NEW_PASSWORD_ENTER')}
                onChange={e => onNewPassword1Change(e.target.value)}/>

            <InputWithError
                marginTop={20}
                theme={editInputTheme}
                title={`${t('NEW_PASSWORD_CONFIRM')}:`}
                id={"new_password2"}
                type={'password'}
                value={newPassword2}
                errors={errors}
                placeholder={t('NEW_PASSWORD_CONFIRM')}
                onChange={e => onNewPassword2Change(e.target.value)}/>

            {renderFormErrors()}

        </StyledChangePasswordDialogFields>

        <StyledDialogButtonsSection>
            <Button theme={cancelButtonTheme} text={t('CANCEL')} onClick={onCancelRequest} disabled={false}/>
            <Button theme={confirmButtonTheme} type={'submit'} text={t('CONFIRM')}
                    disabled={currentPassword === '' || newPassword1 === '' || newPassword2 === ''}/>
        </StyledDialogButtonsSection>
    </StyledChangePasswordDialogForm>;
};