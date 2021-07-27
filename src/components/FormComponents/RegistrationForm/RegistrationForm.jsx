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

import withErrors from "components/withErrors.jsx";
import {Button, Input, Spinner, Text} from "kuchkr-react-component-library";
import React, {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {clearAuthErrors, tryRegister} from "appRedux/reducers/api/account";
import {getResponseError} from "util/api_util.js";

const InputWithError = withErrors(Input);

const RegistrationForm = (props) => {
    const { t } = useTranslation();

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
            return <Button text={t('SIGN_UP')}theme={buttonTheme}/>;
        }
        else if (status === 'SENT_REGISTRATION_REQUEST') {
            return <Spinner text={'Signing up'} theme={spinnerTheme}/>;
        }
    }, [status]);

    let formError = getResponseError(errors, 'non_field_errors');

    return <StyledRegistrationFormComponent {...animatedWindowProps}>
        <form onSubmit={handleSubmit} className={'form'} autoComplete="none">
            <Text theme={signUpTextTheme} text={t('REGISTRATION')}/>
            <Text style={{marginTop: 20, marginBottom: 20}} theme={createNewAccountTextTheme} text={t('CREATE_ACCOUNT')}/>

            <InputWithError id={'email'} type={'text'} placeholder={t('ENTER_EMAIL_INPUT_PLACEHOLDER')} onChange={onEmailChange} errors={errors} disabled={disabled} />
            <InputWithError id={'password'} type={'password'} placeholder={t('ENTER_PASSWORD_INPUT_PLACEHOLDER')} onChange={onPasswordChange} errors={errors} disabled={disabled} />

            {renderUnknownError()}
            {renderFormError(formError)}

            <StyledButtonGroup>{renderSignUpButton()}</StyledButtonGroup>

            <StyledJustRemembered>
                <Text theme={signInTextTheme} text={t('ALREADY_HAVE_ACCOUNT')}/>
                <StyledLink style={{marginLeft: 10}} to={'/'}>{t('SIGN_IN')}</StyledLink>
            </StyledJustRemembered>
        </form>
    </StyledRegistrationFormComponent>;
};

export default RegistrationForm;