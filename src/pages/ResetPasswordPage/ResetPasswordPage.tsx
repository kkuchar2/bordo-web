import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {getResetPasswordState, resetUserSliceRequestState} from 'appRedux/reducers/api/user/userSlice';
import {resetPassword} from "appRedux/services/userService";
import {useAppDispatch} from "appRedux/store";
import {descriptionTextTheme, titleTextTheme} from "components/Dialogs/commonStyles";
import {FormErrors} from "components/Errors/FormErrors/FormErrors";
import {buttonTheme, spinnerTheme, StyledButtonGroup, StyledForm} from "components/Forms/commonStyles";
import {InputWithError} from "components/InputWithError/InputWithError";
import {Button, Spinner, Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import { useSelector} from "react-redux";
import { useParams} from "react-router-dom";

import {isWaiting} from "../../api/api_util";

import {StyledResetPasswordPage} from "./style";

const ResetPasswordPage = () => {

    const {t} = useTranslation();

    const params = useParams();

    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState('');

    const [disabled, setDisabled] = useState(false);

    const dispatch = useAppDispatch();

    const resetPasswordState = useSelector(getResetPasswordState);

    const errors = resetPasswordState.info.errors;

    const onPasswordChange = useCallback((e)=> {
        setPassword(e.target.value);
    }, []);

    const onPasswordConfirmChange = useCallback((e) => {
        setConfirmPassword(e.target.value);
    }, []);

    const attemptResetPassword = useCallback(e => {
        e.preventDefault();
        const tokenArr = params.token.split(':');
        const uid = tokenArr[0];
        const tk = tokenArr[1];
        dispatch(resetPassword(password, confirmPassword, uid, tk));
        setDisabled(true);
    }, [params, password, confirmPassword]);

    useEffect(() => {
        return () => {
            dispatch(resetUserSliceRequestState('resetPassword'));
        };
    }, []);

    useEffect(() => setDisabled(isWaiting(resetPasswordState)), [resetPasswordState]);

    const renderButton = useMemo(() => {
        if (isWaiting(resetPasswordState)) {
            return <Spinner theme={spinnerTheme} text={''}/>;
        } else {
            return <Button text={"Change password"} theme={buttonTheme}/>;
        }
    }, [resetPasswordState]);

    return <StyledResetPasswordPage>
        <StyledForm onSubmit={attemptResetPassword}>
            <Text theme={titleTextTheme} text={"Set up new password"}/>
            <Text theme={descriptionTextTheme} text={"Choose your new password"}/>

            <InputWithError
                id={'new_password1'}
                title={"Password"}
                type={'password'}
                placeholder={"New password"}
                onChange={onPasswordChange}
                errors={errors}
                disabled={disabled}/>

            <InputWithError
                id={'new_password2'}
                title={"Confirm password"}
                type={'password'}
                placeholder={"Confirm new password"}
                onChange={onPasswordConfirmChange}
                errors={errors}
                disabled={disabled}/>

            <FormErrors errors={errors} translation={t}/>

            <StyledButtonGroup>{renderButton}</StyledButtonGroup>
        </StyledForm>
    </StyledResetPasswordPage>;
};

export default ResetPasswordPage;