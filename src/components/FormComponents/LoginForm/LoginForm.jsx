import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearAuthErrors, selectorAuth, tryLogin, tryLoginWithGoogleCredentials} from "appRedux/reducers/api/account";
import {animatedWindowProps} from "components/FormComponents/animation.js";
import {renderFormError} from "components/FormComponents/FormErrorRenderer.js";
import InputWithError from "components/InputWithError.jsx";
import {Button, Spinner, Text} from "kuchkr-react-component-library";

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

const LoginForm = () => {
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
            return <Button text={"Sign in"} theme={buttonTheme}/>;
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
            <Text theme={welcomeBackTextTheme} text={"Welcome back!"}/>
            <Text style={{marginTop: 10, marginBottom: 10}} theme={signInTextTheme}
                  text={"Sign in to your account to continue"}/>

            <InputWithError id={'email'} title={"Email address"} type={'text'} placeholder={"Enter your email address"}
                            onChange={setEmail} errors={errors} disabled={disabled} autoComplete={"on"}/>
            <InputWithError id={'password'} title={"Password"} type={'password'} placeholder={"Select your password"}
                            onChange={setPassword} errors={errors} disabled={disabled} autoComplete={"current-password"}/>

            {renderFormError(errors)}

            <StyledLink style={{marginTop: 20}} to={'/forgotPassword'}>Forgot your password?</StyledLink>

            <StyledButtonGroup>{renderSignInButton()}</StyledButtonGroup>

            <StyledGoogleButton
                clientId="sdfdf"
                buttonText="Sign in with Google"
                onSuccess={attemptLoginWithGoogleCredentials}
                onFailure={onGoogleAuthFailure}
                theme={'dark'}
                uxMode={'popup'}
                style={{display: 'flex'}}
            />

            <StyledNeedAccount>
                <Text theme={needAccountTextTheme} text={"Need an account?"}/>
                <StyledLink style={{marginLeft: 10, marginBottom: 2}} to={'/register'}>Sign up</StyledLink>
            </StyledNeedAccount>
        </form>
    </StyledLoginFormComponent>;
};

export default LoginForm;