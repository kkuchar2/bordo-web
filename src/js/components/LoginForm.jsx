import React, {useState} from "react";
import {useSelector} from "react-redux";

import Text from "components/Text.jsx";
import InputWithError from "components/InputWithError.jsx";

import {onFieldChange, useEffectWithNonNull} from "util/util.js";
import {asyncPOST} from "../redux/api/api.js";

import "componentStyles/LoginForm.scss"
import Spinner from "components/Spinner.jsx";
import Button from "components/Button.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {getResponseError} from "util/api_util.js";

export default () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(undefined);

    const status = useSelector(state => state.login.status);
    const data = useSelector(state => state.login.data);

    const onEmailChange = e => onFieldChange(setEmail, e);

    const onPasswordChange = e => onFieldChange(setPassword, e);

    const handleSubmit = e => {
        e.preventDefault();
        asyncPOST("login", {'email': email, 'password': password})
    }

    const renderFormError = error => {
        if (error === undefined) return;
        if (error.length === 0) return;

        let rows = [];
        for (let i = 0; i < error.length; i++) {
            rows.push(<div key={i} className={"errorWrapper"}>
                <FontAwesomeIcon className={"errorIcon"} icon={faExclamationCircle}/>
                <Text className={"errorText"} text={error[i]['message']}/>
            </div>);
        }
        return <>{rows}</>;
    }

    console.log('Login status:')
    console.log(status)
    const renderButtonContent = () => {
        if (status === 'INIT') {
            return "Sign in"
        }
        else if (status == 'SENT_LOGIN_REQUEST') {
            return <Spinner text={"Signing in"}/>
        }
    }


    let formError = getResponseError(data, 'non_field_errors');

    return <div className={'loginForm'}>
        <form onSubmit={handleSubmit} className={'form'} autoComplete="none">
            <div className={"formTitle"}>
                <Text>Sign in</Text>
            </div>

            <InputWithError data={data} id={'email'} type={"text"} onChange={onEmailChange}
                            placeholder={"Enter your email address"}/>
            <InputWithError data={data} id={'password'} type={'password'} onChange={onPasswordChange}
                            placeholder={"Enter password"} autoComplete="on"/>

            {renderFormError(formError)}

            <div className={"buttonGroup"}>
                <Button>
                    {renderButtonContent()}
                </Button>
            </div>
        </form>
    </div>
}