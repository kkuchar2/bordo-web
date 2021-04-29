import React, {useCallback, useState} from "react";

import Text from "components/Text.jsx";
import {renderInput} from "components/InputWithError.jsx";

import {onFieldChange} from "util/util";
import Button from "components/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getResponseError} from "util/api_util";
import {trySendResetPassword} from "redux/reducers/api/account";
import Spinner from "components/Spinner.jsx";
import {Link} from "react-router-dom";
import {renderFormError} from "components/forms/FormErrorRenderer.js";

import "componentStyles/forms/ForgotPasswordForm.scss";

function ForgotPasswordForm() {

    const [email, setEmail] = useState('');

    const status = useSelector(state => state.auth.status);
    const errors = useSelector(state => state.auth.errors);
    const dispatch = useDispatch();

    const onEmailChange = useCallback(e => onFieldChange(setEmail, e), []);

    const sendResetPasswordRequest = useCallback(e => {
        e.preventDefault();
        dispatch(trySendResetPassword(email));
    }, [email]);

    const renderButtonContent = useCallback(() => {
        if (status !== 'SENT_PASSWORD_RESET') {
            return "Reset password 🔑";
        }
        else {
            return <Spinner/>;
        }
    }, [status]);

    let formError = getResponseError(errors, 'non_field_errors');

    return <div className={'forgotPasswordComponent'}>
        <form onSubmit={sendResetPasswordRequest} className={'form'} autoComplete="none">

            <Text className={"formTitle"}>Reset your password</Text>
            <Text className={"formDescription"}>Enter your e-mail address and we'll send you a reset password link</Text>

            {renderInput('email', "Email address", 'text', "Enter your email address", "on", onEmailChange, errors)}

            {renderFormError(formError)}

            <div className={"buttonGroup"}>
                <Button>
                    {renderButtonContent()}
                </Button>
            </div>

            <div className={"justRemembered"}>
                <Text className="justRememberedText" text={"Just remembered?"}/>
                <Link to={'/login'} className={"signInLink"}>Sign in</Link>
            </div>
        </form>
    </div>;
}

export default ForgotPasswordForm;