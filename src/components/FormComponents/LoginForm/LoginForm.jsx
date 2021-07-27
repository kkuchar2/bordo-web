import React, {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {clearAuthErrors, selectorAuth, tryLogin, tryLoginWithGoogleCredentials} from "appRedux/reducers/api/account";
import {animatedWindowProps} from "components/FormComponents/animation.js";
import {renderFormError} from "components/FormComponents/FormErrorRenderer.js";
import withErrors from "components/withErrors.jsx";
import {Button, Input, Spinner, Text} from "kuchkr-react-component-library";

import {
    buttonTheme,
    needAccountTextTheme,
    signInTextTheme,
    spinnerTheme,
    StyledButtonGroup,
    StyledGoogleButton,
    StyledLink,
    StyledLoginFormComponent,
    StyledNeedAccount,
    welcomeBackTextTheme
} from "components/FormComponents/LoginForm/style.js";

const InputWithError = withErrors(Input);

const LoginForm = () => {
    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [disabled, setDisabled] = useState(false);
    const dispatch = useDispatch();

    const authState = useSelector(selectorAuth);

    const errors = authState.errors;

    const attemptLogin = useCallback(e => {
        e.preventDefault();
        dispatch(tryLogin(email, password));
        setDisabled(true);
    }, [email, password]);

    useEffect(() => {
        dispatch(clearAuthErrors());
    }, []);

    const attemptLoginWithGoogleCredentials = useCallback((response) => {
        console.log(response.accessToken);
        dispatch(tryLoginWithGoogleCredentials(response.accessToken));
    }, []);

    const renderSignInButton = useCallback(() => {
        if (!authState.requestPending) {
            return <Button text={t('SIGN_IN')} theme={buttonTheme}/>;
        }
        else {
            return <Spinner theme={spinnerTheme} text={"Signing in"}/>;
        }
    }, [authState.requestPending]);

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setDisabled(false);
        }
    }, [errors]);

    const onGoogleAuthFailure = useCallback((response) => {
        console.log(response);
    }, []);

    return <StyledLoginFormComponent {...animatedWindowProps}>
        <form onSubmit={attemptLogin} className={'form'} autoComplete="none">
            <Text theme={welcomeBackTextTheme} text={t('WELCOME_BACK')}/>
            <Text style={{marginTop: 10, marginBottom: 10}} theme={signInTextTheme}
                  text={t('LOGIN_TO_CONTINUE')}/>

            <InputWithError id={'email'} type={'text'} placeholder={t('ENTER_EMAIL_INPUT_PLACEHOLDER')}
                            onChange={setEmail} errors={errors} disabled={disabled} autoComplete={"on"}/>
            <InputWithError id={'password'} type={'password'} placeholder={t('ENTER_PASSWORD_INPUT_PLACEHOLDER')}
                            onChange={setPassword} errors={errors} disabled={disabled} autoComplete={"current-password"}/>

            {renderFormError(errors)}

            <StyledLink style={{marginTop: 20}} to={'/forgotPassword'}>{t('FORGOT_PASSWORD')}</StyledLink>

            <StyledButtonGroup>{renderSignInButton()}</StyledButtonGroup>

            <StyledGoogleButton
                clientId="sdfdf"
                buttonText={t('SIGNIN_WTH_GOOGLE')}
                onSuccess={attemptLoginWithGoogleCredentials}
                onFailure={onGoogleAuthFailure}
                theme={'dark'}
                uxMode={'popup'}
                style={{display: 'flex'}}
            />

            <StyledNeedAccount>
                <Text theme={needAccountTextTheme} text={t('NEED_ACCOUNT')}/>
                <StyledLink style={{marginLeft: 10, marginBottom: 2}} to={'/register'}>{t('SIGN_UP')}</StyledLink>
            </StyledNeedAccount>
        </form>
    </StyledLoginFormComponent>;
};

export default LoginForm;