import React, {useCallback, useEffect, useState} from "react";

import Text from "components/Text.jsx";
import {renderInput} from "components/InputWithError.jsx";

import {onFieldChange} from "util/util";
import Button from "components/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getResponseError} from "util/api_util";
import {tryLogin, clearErrors} from "redux/reducers/api/account";
import Spinner from "components/Spinner.jsx";
import {Link} from "react-router-dom";
import GoogleButton from 'react-google-button';
import {renderFormError} from "components/forms/FormErrorRenderer.js";

import "componentStyles/forms/LoginForm.scss";

function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const status = useSelector(state => state.auth.status);
    const errors = useSelector(state => state.auth.errors);
    const dispatch = useDispatch();

    const onEmailChange = useCallback(e => onFieldChange(setEmail, e), []);

    const onPasswordChange = useCallback(e => onFieldChange(setPassword, e), []);

    useEffect(() => () => dispatch(clearErrors()), []);

    const attemptLogin = useCallback(e => {
        e.preventDefault();
        dispatch(tryLogin(email, password));
    }, [email, password]);

    const renderButtonContent = useCallback(() => {
        if (status !== 'SENT_LOGIN_REQUEST') {
            return "Sign in";
        }
        else {
            return <Spinner/>;
        }
    }, [status]);

    let formError = getResponseError(errors, 'non_field_errors');

    return <div className={'loginFormComponent'}>
        <form onSubmit={attemptLogin} className={'form'} autoComplete="none">
            <Text className={"formTitle"}>Welcome back!</Text>
            <Text className={"formDescription"}>Sign in to your account to continue</Text>

            {renderInput('email', "Email address", 'text', "Enter your email address", "on", onEmailChange, errors)}
            {renderInput('password', "Password", 'password', "Enter your password", "on", onPasswordChange, errors)}

            {renderFormError(formError)}

            <Link to={'/forgotPassword'} className={"forgotPassword"}>Forgot your password?</Link>

            <div className={"buttonGroup"}>
                <Button>
                    {renderButtonContent()}
                </Button>
                <GoogleButton className={"googleButton"} onClick={() => { console.log('Google button clicked'); }} />
            </div>

            <div className={"needAccount"}>
                <Text className="needAccountText" text={"Need an account?"}/>
                <Link to={'/register'} className={"registerLink"}>Sign up</Link>
            </div>
        </form>
    </div>;
}

export default LoginForm;