import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Text from "components/Text";
import InputWithError from "components/InputWithError";
import {onFieldChange} from "util/util.js";
import Spinner from "components/Spinner";
import Button from "components/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {getResponseError} from "util/api_util.js";
import {selectorRegistration, tryRegister} from "../redux/reducers/api/account";

import "componentStyles/RegistrationForm.scss"
import {Link} from "react-router-dom";

export default () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();

    const registrationState = useSelector(selectorRegistration)

    const status = registrationState.status;
    const errors = registrationState.errors;

    const onEmailChange = e => onFieldChange(setEmail, e);

    const onPasswordChange = e => onFieldChange(setPassword, e);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(tryRegister(email, password));
    }

    const renderUnknownError = () => {
        if (status === "INIT" && errors !== undefined && errors !== null && errors === 'unknown_error') {
            return <div className={"unknownError"}>
                <Text text={"Something went wrong"}/>
            </div>
        }
    }

    const renderFormError = error => {
        if (error === undefined) {
            return;
        }
        if (error.length === 0) {
            return;
        }

        let rows = [];
        for (let i = 0; i < error.length; i++) {
            rows.push(<div key={i} className={"errorWrapper"}>
                <FontAwesomeIcon className={"errorIcon"} icon={faExclamationCircle}/>
                <Text className={"errorText"} text={error[i]['message']}/>
            </div>);
        }
        return <>{rows}</>;
    }

    const renderButtonContent = () => {
        if (status === 'INIT' || status === 'ERROR') {
            return "Sign up"
        }
        else if (status == 'SENT_REGISTRATION_REQUEST') {
            return <Spinner/>
        }
    }

    let formError = getResponseError(errors, 'non_field_errors');

    return <div className={'registrationFormComponent'}>

        <form onSubmit={handleSubmit} className={'form'} autoComplete="none">

            <Text className={"formTitle"}>Sign up 🤗</Text>
            <Text className={"formDescription"}>Create new account</Text>

            {renderUnknownError()}

            <InputWithError errors={errors} name="Email address" id={'email'} type={"text"}
                            onChange={onEmailChange}
                            placeholder={"Enter your email address"}/>

            <InputWithError errors={errors} name="Password" id={'password'} type={'password'}
                            onChange={onPasswordChange}
                            placeholder={"Select your password"} autoComplete="on"/>

            {renderFormError(formError)}

            <div className={"buttonGroup"}>
                <Button>
                    {renderButtonContent()}
                </Button>
            </div>

            <Link to={'/login'} className={"loginLink"}>Already have an account?</Link>
        </form>
    </div>
}