import {animatedWindowProps} from "components/FormComponents/animation.js";
import {renderFormError} from "components/FormComponents/FormErrorRenderer.js";
import {spinnerTheme} from "components/FormComponents/LoginForm/style.js";

import {
    buttonTheme,
    createNewAccountTextTheme,
    errorTextTheme,
    signInTextTheme,
    signUpTextTheme,
    StyledButtonGroup,
    StyledJustRemembered,
    StyledLink,
    StyledRegistrationFormComponent,
    StyledUnknownError
} from "components/FormComponents/RegistrationForm/style.js";

import InputWithError from "components/InputWithError.jsx";
import {Button, Spinner, Text} from "kuchkr-react-component-library";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearAuthErrors, tryRegister} from "appRedux/reducers/api/account";
import {getResponseError} from "util/api_util.js";

const RegistrationForm = (props) => {

    const {formSelector} = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);

    const dispatch = useDispatch();
    const state = useSelector(formSelector);

    const status = state ? state.status : 'ERROR';
    const errors = state ? state.errors : [];

    const onEmailChange = useCallback(setEmail, []);

    const onPasswordChange = useCallback(setPassword, []);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(tryRegister(email, password));
        setDisabled(true);
    };

    useEffect(() => {
        dispatch(clearAuthErrors());
    }, []);

    useEffect(() => {
        if (!status || !errors) {
            return;
        }

        if (status === 'ERROR' || errors && Object.keys(errors).length > 0) {
            setDisabled(false);
        }
    }, [errors]);

    const renderUnknownError = useCallback(() => {
        if (!status || !errors) {
            return;
        }

        if (status === "ERROR" && (Object.keys(errors).length === 0 || errors === 'unknown_error')) {
            return <StyledUnknownError>
                <Text theme={errorTextTheme} text={"Something went wrong"}/>
            </StyledUnknownError>;
        }
    }, [status, errors]);

    const renderSignUpButton = useCallback(() => {
        if (status === 'INIT' || status === 'ERROR') {
            return <Button text={"Sign up"} theme={buttonTheme}/>;
        }
        else if (status === 'SENT_REGISTRATION_REQUEST') {
            return <Spinner text={'Signing up'} theme={spinnerTheme}/>;
        }
    }, [status]);

    let formError = getResponseError(errors, 'non_field_errors');

    return <StyledRegistrationFormComponent {...animatedWindowProps}>
        <form onSubmit={handleSubmit} className={'form'} autoComplete="none">
            <Text theme={signUpTextTheme} text={"Sign up 🤗"}/>
            <Text style={{marginTop: 20, marginBottom: 20}} theme={createNewAccountTextTheme} text={"Create new account"}/>

            <InputWithError id={'email'} title={"Password"} type={'text'} placeholder={"Enter your email address"} onChange={onEmailChange} errors={errors} disabled={disabled} />
            <InputWithError id={'password'} title={"Password"} type={'password'} placeholder={"Select your password"} onChange={onPasswordChange} errors={errors} disabled={disabled} />

            {renderUnknownError()}
            {renderFormError(formError)}

            <StyledButtonGroup>{renderSignUpButton()}</StyledButtonGroup>

            <StyledJustRemembered>
                <Text theme={signInTextTheme} text={"Already have an account?"}/>
                <StyledLink style={{marginLeft: 10}} to={'/'}>Sign in</StyledLink>
            </StyledJustRemembered>
        </form>
    </StyledRegistrationFormComponent>;
};

export default RegistrationForm;