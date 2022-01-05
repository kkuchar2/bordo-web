import React, {useCallback, useEffect, useState} from "react";

import {
    selectorAuth,
    selectorChangeEmail,
    tryResetChangeEmailState,
    trySendChangeEmail
} from "appRedux/reducers/api/account";
import {closeDialog} from "appRedux/reducers/application";
import {useAppDispatch} from "appRedux/store";
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

import {StyledChangeEmailDialogForm} from "./style";

export interface ChangeEmailDialogProps extends BaseDialogProps {
    onConfirm: (e: Event) => void,
    onCancel: (e: Event) => void
}

export const ChangeEmailDialog = (props: ChangeEmailDialogProps) => {

    const {onConfirm, onCancel} = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [allowVisible, setAllowVisible] = useState(false);

    const {t} = useTranslation();

    const dispatch = useAppDispatch();

    const authState = useSelector(selectorAuth);
    const changeEmailState = useSelector(selectorChangeEmail);
    const errors = changeEmailState.errors;

    useEffect(() => {
        dispatch(tryResetChangeEmailState());
        setAllowVisible(true);
    }, []);

    const sendChangeEmail = useCallback((e) => {
        e.preventDefault();
        dispatch(trySendChangeEmail({currentEmail: authState.user.email, newEmail: email, currentPassword: password}));
    }, [authState, email, password]);

    withRequestSuccess(changeEmailState, () => {
        console.log(changeEmailState);
        dispatch(tryResetChangeEmailState());
        dispatch(closeDialog());
    });

    const renderFormErrors = useCallback(() => {
        if (!errors || !allowVisible) {
            return null;
        }

        return <FormErrors errors={errors} translation={t}/>;
    }, [errors, allowVisible]);

    return <StyledChangeEmailDialogForm onSubmit={sendChangeEmail}>
        <ErroredInput
            autoFocus={true}
            theme={editInputTheme}
            style={{width: '100%', marginTop: 0}}
            id={'new_email'}
            title={`${t('NEW_EMAIL_ADDRESS')}:`}
            type={'email'}
            autoComplete={'on'}
            errors={errors}
            value={email}
            onChange={setEmail}
            placeholder={t('NEW_EMAIL_ADDRESS_ENTER')}/>

        <ErroredInput
            theme={editInputTheme}
            style={{width: '100%', marginTop: 20}}
            id={'password'}
            title={`${t('CURRENT_PASSWORD')}:`}
            type={'password'}
            value={password}
            errors={errors}
            onChange={setPassword}
            placeholder={t('CURRENT_PASSWORD_ENTER')}/>

        {renderFormErrors()}

        <StyledDialogButtonsSection>
            <Button theme={cancelButtonTheme} text={t('CANCEL')} onClick={onCancel} disabled={false}/>
            <Button theme={confirmButtonTheme} type={'submit'} text={t('CONFIRM')}
                    disabled={email === '' || password === ''}/>
        </StyledDialogButtonsSection>
    </StyledChangeEmailDialogForm>;
};