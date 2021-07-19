import {animatedWindowProps} from "components/FormComponents/animation.js";
import {renderFormError} from "components/FormComponents/FormErrorRenderer.js";
import InputWithError from "components/InputWithError.jsx";
import {Button, Spinner, Text} from "kuchkr-react-component-library";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearAuthErrors, selectorAuth, tryLogin, tryLoginWithGoogleCredentials} from "appRedux/reducers/api/account";
import {getResponseError} from "util/api_util.js";

import {
    buttonTheme,
    errorTextTheme,
    needAccountTextTheme,
    signInTextTheme, spinnerTheme,
    StyledButtonGroup,
    StyledGoogleButton,
    StyledLink,
    StyledLoginFormComponent,
    StyledNeedAccount,
    StyledUnknownError,
    welcomeBackTextTheme
} from "components/FormComponents/LoginForm/style.js";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [disabled, setDisabled] = useState(false);
    const dispatch = useDispatch();

    const authState = useSelector(selectorAuth);

    const errors = authState.errors;

    const onEmailChange = useCallback(setEmail, []);

    const onPasswordChange = useCallback(setPassword, []);

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

    const renderUnknownError = useCallback(() => {
        if (Object.keys(errors).length === 0) {
            return <StyledUnknownError>
                <Text theme={errorTextTheme} text={"Something went wrong"}/>
            </StyledUnknownError>;
        }
    }, [errors]);

    const renderNetworkError = () => {
        if (errors === 'network_error') {
            return <StyledUnknownError>
                <Text theme={errorTextTheme} text={"Could not connect to server"}/>
            </StyledUnknownError>;
        }
    };

    const onGoogleAuthFailure = useCallback((response) => {
        console.log(response);
    }, []);

    let formError = getResponseError(errors, 'non_field_errors');

    return <StyledLoginFormComponent {...animatedWindowProps}>
        <form onSubmit={attemptLogin} className={'form'} autoComplete="none">
            <Text theme={welcomeBackTextTheme} text={"Welcome back!"}/>
            <Text style={{marginTop: 10, marginBottom: 10}} theme={signInTextTheme}
                  text={"Sign in to your account to continue"}/>

            <InputWithError id={'email'} title={"Email address"} type={'text'} placeholder={"Enter your email address"}
                            onChange={onEmailChange} errors={errors} disabled={disabled}/>
            <InputWithError id={'password'} title={"Password"} type={'password'} placeholder={"Select your password"}
                            onChange={onPasswordChange} errors={errors} disabled={disabled}/>

            {renderNetworkError()}
            {renderUnknownError()}
            {renderFormError(formError)}

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