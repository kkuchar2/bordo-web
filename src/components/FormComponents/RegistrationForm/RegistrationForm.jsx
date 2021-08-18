import {selectorRegistration, tryRegister} from "appRedux/reducers/api/account";
import {animatedWindowProps} from "components/FormComponents/animation.js";
import {
    buttonTheme,
    formTitleTheme,
    questionTextTheme,
    spinnerTheme,
    StyledButtonGroup,
    StyledLink,
    StyledQuestionWithLinkTheme
} from "components/FormComponents/commonStyles.js";
import {FormErrors} from "components/FormComponents/FormErrors/FormErrors.jsx";

import {StyledRegistrationFormComponent} from "components/FormComponents/RegistrationForm/style.js";

import withErrors from "components/withErrors.jsx";
import {Button, Input, Spinner, Text} from "kuchkr-react-component-library";
import React, {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

const InputWithError = withErrors(Input);

const RegistrationForm = (props) => {
    const {t} = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);

    const dispatch = useDispatch();

    const registrationState = useSelector(selectorRegistration);

    const errors = registrationState.errors;

    const onEmailChange = useCallback(setEmail, []);

    const onPasswordChange = useCallback(setPassword, []);

    const attemptRegistration = e => {
        e.preventDefault();
        dispatch(tryRegister(email, password));
        setDisabled(true);
    };

    const renderSignUpButton = useCallback(() => {
        const path = registrationState.path;
        const isRegistrationContext = path === 'register';
        const isRequestPending = registrationState.requestSent && !registrationState.responseReceived;

        if (isRegistrationContext && isRequestPending) {
            return <Spinner theme={spinnerTheme} text={t("SIGNING_UP_PROGRESS")}/>;
        }
        return <Button text={t('SIGN_UP')} theme={buttonTheme}/>;
    }, [registrationState]);

    return <StyledRegistrationFormComponent {...animatedWindowProps}>
        <form onSubmit={attemptRegistration} className={'form'} autoComplete="none">
            <Text theme={formTitleTheme} text={t('REGISTRATION')}/>

            <StyledQuestionWithLinkTheme>
                <Text theme={questionTextTheme} text={t('ALREADY_HAVE_ACCOUNT')}/>
                <StyledLink style={{marginLeft: 10}} to={'/'}>{t('SIGN_IN')}</StyledLink>
            </StyledQuestionWithLinkTheme>

            <InputWithError
                id={'email'}
                type={'text'}
                title={'E-mail:'}
                placeholder={t('ENTER_EMAIL_INPUT_PLACEHOLDER')}
                onChange={onEmailChange}
                errors={errors}
                disabled={disabled}/>

            <InputWithError
                id={'password'}
                type={'password'}
                title={t('INPUT_PASSWORD_TITLE')}
                placeholder={t('ENTER_PASSWORD_INPUT_PLACEHOLDER')}
                onChange={onPasswordChange}
                errors={errors}
                disabled={disabled}/>

            <FormErrors errors={errors} translation={t}/>

            <StyledButtonGroup>{renderSignUpButton()}</StyledButtonGroup>
        </form>
    </StyledRegistrationFormComponent>;
};

export default RegistrationForm;