import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Text from "components/Text.jsx";
import {onFieldChange} from "util/util";
import Spinner from "components/Spinner.jsx";
import Button from "components/Button.jsx";
import {getResponseError} from "util/api_util";
import {selectorRegistration, tryRegister} from "redux/reducers/api/account";
import {Link} from "react-router-dom";
import {renderInput} from "components/InputWithError.jsx";
import {renderFormError} from "components/forms/FormErrorRenderer.js";

import "componentStyles/forms/RegistrationForm.scss";

function RegistrationForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const registrationState = useSelector(selectorRegistration);

    const status = registrationState.status;
    const errors = registrationState.errors;

    const onEmailChange = e => onFieldChange(setEmail, e);

    const onPasswordChange = e => onFieldChange(setPassword, e);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(tryRegister(email, password));
    };

    const renderUnknownError = () => {
        if (status === "INIT" && errors !== undefined && errors !== null && errors === 'unknown_error') {
            return <div className={"unknownError"}>
                <Text text={"Something went wrong"}/>
            </div>;
        }
    };

    const renderButtonContent = () => {
        if (status === 'INIT' || status === 'ERROR') {
            return "Sign up";
        }
        else if (status === 'SENT_REGISTRATION_REQUEST') {
            return <Spinner/>;
        }
    };

    let formError = getResponseError(errors, 'non_field_errors');

    return <div className={'registrationFormComponent'}>

        <form onSubmit={handleSubmit} className={'form'} autoComplete="none">

            <Text className={"formTitle"} text={"Sign up 🤗"} />
            <Text className={"formDescription"} text={"Create new account"} />

            {renderUnknownError()}

            {renderInput('email', "Email address", 'text', "Enter your email address", "on", onEmailChange, errors)}
            {renderInput('password', "Password", 'password', "Select your password", "on", onPasswordChange, errors)}

            {renderFormError(formError)}

            <div className={"buttonGroup"}>
                <Button>
                    {renderButtonContent()}
                </Button>
            </div>

            <Link to={'/login'} className={"loginLink"}>Already have an account?</Link>
        </form>
    </div>;
}

export default RegistrationForm;