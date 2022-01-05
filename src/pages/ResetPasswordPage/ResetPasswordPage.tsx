import React, {useCallback, useEffect, useState} from 'react';

import {selectorResetPassword, trySendResetPassword} from "appRedux/reducers/api/account";
import {descriptionTextTheme, titleTextTheme} from "components/Dialogs/commonStyles";
import {ErroredInput} from "components/ErroredInput/ErroredInput";
import {buttonTheme, spinnerTheme, StyledButtonGroup, StyledForm} from "components/Forms/commonStyles";
import {FormErrors} from "components/Forms/FormErrors/FormErrors";
import {Button, Spinner, Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {RouteComponentProps} from "react-router-dom";

import {StyledResetPasswordPage} from "./style";

interface MatchParams {
    token: string;
}

const ResetPasswordPage = (props: RouteComponentProps<MatchParams>) => {

    const {t} = useTranslation();

    const token = props.match.params.token;

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');

    const [disabled, setDisabled] = useState(false);

    const dispatch = useDispatch();

    const resetPasswordState = useSelector(selectorResetPassword);
    const errors = resetPasswordState.errors;

    const onOldPasswordChange = useCallback(setOldPassword, []);

    const onNewPassword1Change = useCallback(setNewPassword1, []);

    const onNewPassword2Change = useCallback(setNewPassword2, []);

    const attemptResetPassword = useCallback(e => {
        e.preventDefault();
        const tokenArr = token.split(':');
        const uid = tokenArr[0];
        const tk = tokenArr[1];
        dispatch(trySendResetPassword(newPassword1, newPassword2, uid, tk));
        setDisabled(true);
    }, [token, oldPassword, newPassword1, newPassword2]);

    useEffect(() => setDisabled(resetPasswordState.requestPending), [resetPasswordState]);

    const renderButton = useCallback(() => {
        if (!resetPasswordState.requestPending) {
            return <Button text={"Change password"} theme={buttonTheme}/>;
        } else {
            return <Spinner theme={spinnerTheme} text={''}/>;
        }
    }, [resetPasswordState]);

    return <StyledResetPasswordPage>s
        <StyledForm onSubmit={attemptResetPassword}>
            <Text theme={titleTextTheme} text={"Password reset"}/>
            <Text theme={descriptionTextTheme} text={"Choose your new password"}/>

            <ErroredInput
                id={'new_password1'}
                title={"Password"}
                type={'password'}
                placeholder={"New password"}
                onChange={onNewPassword1Change}
                errors={errors}
                disabled={disabled}/>

            <ErroredInput
                id={'new_password2'}
                title={"Confirm password"}
                type={'password'}
                placeholder={"Confirm new password"}
                onChange={onNewPassword2Change}
                errors={errors}
                disabled={disabled}/>

            <FormErrors errors={errors} translation={t}/>

            <StyledButtonGroup>{renderButton()}</StyledButtonGroup>
        </StyledForm>
    </StyledResetPasswordPage>;
};

export default ResetPasswordPage;