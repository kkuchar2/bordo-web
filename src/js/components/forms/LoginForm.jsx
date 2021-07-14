import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {renderInput} from "components/InputWithError.jsx";
import {Button, Spinner, Text} from "kuchkr-react-component-library";
import GoogleLogin from "react-google-login";
import {selectorAuth, tryLogin, tryLoginWithGoogleCredentials} from "redux/reducers/api/account";
import {getResponseError} from "util/api_util";
import {renderFormError} from "components/forms/FormErrorRenderer.js";
import styled from "styled-components";

import {
    buttonTheme,
    errorTextTheme,
    needAccountTextTheme, signInTextTheme,
    StyledButtonGroup, StyledGoogleButton,
    StyledLink,
    StyledLoginFormComponent, StyledNeedAccount,
    StyledUnknownError, welcomeBackTextTheme
} from "components/forms/loginFormStyle.js";


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [disabled, setDisabled] = useState(false);
    const dispatch = useDispatch();

    const authState = useSelector(selectorAuth);

    const status = authState ? authState.status : 'ERROR';
    const errors = authState ? authState.errors : [];

    const onEmailChange = useCallback(setEmail, []);

    const onPasswordChange = useCallback(setPassword, []);

    const attemptLogin = useCallback(e => {
        e.preventDefault();
        dispatch(tryLogin(email, password));
        setDisabled(true);
    }, [email, password]);

    const attemptLoginWithGoogleCredentials = useCallback((response) => {
        console.log(response.accessToken);
        dispatch(tryLoginWithGoogleCredentials(response.accessToken));
    }, []);

    const renderSignInButton = useCallback(() => {
        if (status !== 'SENT_LOGIN_REQUEST') {
            return <Button text={"Sign in"} theme={buttonTheme}/>;
        }
        else {
            return <Spinner/>;
        }
    }, [status]);

    useEffect(() => {
        if (status === 'ERROR' || errors && Object.keys(errors).length > 0) {
            setDisabled(false);
        }
    }, [errors]);

    const renderUnknownError = () => {
        if (status === "ERROR" && Object.keys(errors).length === 0) {
            // setDisabled(false);
            return <StyledUnknownError>
                <Text theme={errorTextTheme} text={"Something went wrong"}/>
            </StyledUnknownError>;
        }
    };

    const renderNetworkError = () => {
        console.log('Rendering network error');
        console.log(errors);

        if (status === "ERROR" && errors === 'network_error') {

            return <StyledUnknownError>
                <Text theme={errorTextTheme} text={"Could not connect to server"}/>
            </StyledUnknownError>;
        }
    };

    const onGoogleAuthFailure = useCallback((response) => {
        console.log(response);
    }, []);

    let formError = getResponseError(errors, 'non_field_errors');

    return <StyledLoginFormComponent className={'loginFormComponent'}>
        <form onSubmit={attemptLogin} className={'form'} autoComplete="none">
            <Text theme={welcomeBackTextTheme} text={"Welcome back!"}/>
            <Text style={{marginTop: 10, marginBottom: 10}} theme={signInTextTheme}
                  text={"Sign in to your account to continue"}/>

            {renderInput('email', "Email address", 'text', "Enter your email address", "on", onEmailChange, errors, disabled)}
            {renderInput('password', "Password", 'password', "Enter your password", "on", onPasswordChange, errors, disabled)}

            {renderNetworkError()}
            {renderUnknownError()}
            {renderFormError(formError)}

            <StyledLink style={{marginTop: 20}} to={'/forgotPassword'}>Forgot your password?</StyledLink>

            <StyledButtonGroup>{renderSignInButton()}</StyledButtonGroup>

            <StyledGoogleButton
                clientId="{GOOGLE_CLIENT_ID}"
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