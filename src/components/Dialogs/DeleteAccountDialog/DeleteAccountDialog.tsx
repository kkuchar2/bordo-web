import React, {useCallback, useEffect, useState} from "react";

import {getDeleteAccountState, getUserState, resetUserSliceRequestState} from "appRedux/reducers/api/user/userSlice";
import {closeDialog} from "appRedux/reducers/application";
import {deleteAccount} from "appRedux/services/userService";
import {useAppDispatch} from "appRedux/store";
import {cancelButtonTheme, confirmButtonTheme} from "components/Dialogs/commonStyles";
import {StyledDialogButtonsSection} from "components/Dialogs/style";
import {DialogProps} from "components/Dialogs/types";
import {editInputTheme} from "components/EditableProperties/EditableTextProperty/style";
import {InputWithError} from "components/InputWithError/InputWithError";
import {Button} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

import {isSuccess} from "../../../api/api_util";

import {
    StyledDeleteAccountDialogFormContent,
    StyledDeleteAccountDialogFields,
    StyledDeleteAccountDialogForm,
    StyledDeleteAccountWarningText
} from "./style";

export const DeleteAccountDialog = (props: DialogProps) => {

    const { onConfirm, onCancel } = props.dialog;

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const [password, setPassword] = useState('');

    const userState = useSelector(getUserState);
    const deleteAccountState = useSelector(getDeleteAccountState);
    const errors = deleteAccountState.info.errors;

    useEffect(() => {
        return () => {
            dispatch(resetUserSliceRequestState('deleteAccount'));
        };
    }, []);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch(deleteAccount(userState.email.email, password));
    }, [userState, password]);

    const onCancelRequest = useCallback((e) => {
        dispatch(closeDialog());
    }, []);

    useEffect(() => {
        if (isSuccess(deleteAccountState)) {
            dispatch(closeDialog());
        }
    }, [deleteAccountState]);

    return <StyledDeleteAccountDialogForm onSubmit={onSubmit}>

        <StyledDeleteAccountDialogFormContent>
            <StyledDeleteAccountWarningText>
                {t('DELETE_ACCOUNT_WARNING')}
            </StyledDeleteAccountWarningText>

            <StyledDeleteAccountDialogFields>
                <InputWithError
                    theme={editInputTheme}
                    style={{ width: '100%', marginTop: 20 }}
                    id={'password'}
                    title={`${t('PASSWORD')}:`}
                    type={'password'}
                    value={password}
                    errors={errors}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={t('CURRENT_PASSWORD_ENTER')}/>
            </StyledDeleteAccountDialogFields>
        </StyledDeleteAccountDialogFormContent>
        <StyledDialogButtonsSection>
            <Button theme={cancelButtonTheme} text={t('CANCEL')} onClick={onCancelRequest} disabled={false}/>
            <Button theme={confirmButtonTheme} type={'submit'} text={t('CONFIRM')} disabled={password === ''}/>
        </StyledDialogButtonsSection>
    </StyledDeleteAccountDialogForm>;
};