import React, {useCallback, useState} from "react";

import Text from "components/Text";
import InputWithError from "components/InputWithError";

import {onFieldChange} from "util/util.js";
import Button from "components/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {getResponseError} from "util/api_util.js";
import {tryLogin} from "../redux/reducers/api/account";
import Spinner from "components/Spinner";
import {Link} from "react-router-dom";

import "componentStyles/LoginForm.scss";

function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const status = useSelector(state => state.auth.status);
    const errors = useSelector(state => state.auth.errors);
    const dispatch = useDispatch();

    const onEmailChange = useCallback(e => onFieldChange(setEmail, e), []);

    const onPasswordChange = useCallback(e => onFieldChange(setPassword, e), []);

    const attemptLogin = useCallback(e => {
        e.preventDefault();
        dispatch(tryLogin(email, password));
    }, [email, password]);

    const renderFormError = useCallback(err => {
        if (err === undefined) {
            return;
        }
        if (err.length === 0) {
            return;
        }

        let rows = [];
        for (let i = 0; i < err.length; i++) {
            rows.push(<div key={i} className={"errorWrapper"}>
                <FontAwesomeIcon className={"errorIcon"} icon={faExclamationCircle}/>
                <Text className={"errorText"} text={err[i]['message']}/>
            </div>);
        }
        return <>{rows}</>;
    }, []);

    const renderButtonContent = useCallback(() => {
        if (status !== 'SENT_LOGIN_REQUEST') {
            return "Sign in ⟶";
        }
        else {
            return <Spinner/>;
        }
    }, [status]);

    let formError = getResponseError(errors, 'non_field_errors');

    return <div className={'loginFormComponent'}>
        <form onSubmit={attemptLogin} className={'form'} autoComplete="none">
            <Text className={"formTitle"}>Sign in 🔑</Text>
            <Text className={"formDescription"}>Sign in to your account to continue</Text>

            <InputWithError errors={errors} name="Email address" id={'email'} type={"text"}
                            onChange={onEmailChange}
                            placeholder={"Enter your email address"}/>

            <InputWithError errors={errors} name="Password" id={'password'} type={'password'}
                            onChange={onPasswordChange}
                            placeholder={"Enter your password"} autoComplete="on"/>

            {renderFormError(formError)}

            <Link to={'/register'} className={"forgotPassword"}>Forgot your password?</Link>

            <div className={"buttonGroup"}>
                <Button>
                    {renderButtonContent()}
                </Button>
            </div>

            <div className={"needAccount"}>
                <Text className="needAccountText" text={"Need an account?"}/>
                <Link to={'/register'} className={"registerLink"}>Register</Link>
            </div>
        </form>
    </div>;
}

export default LoginForm;