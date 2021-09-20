import React, {useCallback, useEffect, useState} from "react";

import {selectorRegistration, tryRegister} from "appRedux/reducers/api/account";
import {closeDialog, openDialog} from "appRedux/reducers/application";
import {defaultShowUpAnimation} from "components/FormComponents/animation";
import {
    buttonTheme,
    formTitleTheme,
    questionTextTheme,
    spinnerTheme,
    StyledButtonGroup,
    StyledLink,
    StyledQuestionWithLinkTheme
} from "components/FormComponents/commonStyles";
import {FormErrors} from "components/FormComponents/FormErrors/FormErrors";
import withErrors from "components/withErrors";
import {Button, Input, Spinner, Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

import {StyledRegistrationFormComponent} from "./style";

const InputWithError = withErrors(Input);

const RegistrationForm = () => {

    const {t} = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);

    const dispatch = useDispatch();

    const registrationState = useSelector(selectorRegistration);

    const errors = registrationState.errors;

    const onEmailChange = useCallback(setEmail, []);

    const onPasswordChange = useCallback(setPassword, []);

    const attemptRegistration = (e: any) => { // TODO
        e.preventDefault();
        dispatch(tryRegister(email, password));
        setDisabled(true);
    };

    useEffect(() => {
        const path = registrationState.path;
        const isRegistrationContext = path === 'register';
        const isRequestComplete = registrationState.requestSent && !registrationState.responseReceived;
        const errors = registrationState.errors;

        console.log(registrationState);

        if (isRequestComplete && errors.length === 0 && isRegistrationContext) {
            dispatch(openDialog({
                component: "RegistrationCompleteDialog",
                props: {
                    title: 'Registration complete',
                    description: 'Whoa, you have completed registration! We have sent you confirmation email!',
                    onGoHome: () => {
                        dispatch(closeDialog());
                    }
                }
            }));
        }

    }, [registrationState]);

    const renderSignUpButton = useCallback(() => {
        const path = registrationState.path;
        const isRegistrationContext = path === 'register';
        const isRequestPending = registrationState.requestSent && !registrationState.responseReceived;

        if (isRegistrationContext && isRequestPending) {
            return <Spinner theme={spinnerTheme} text={t("SIGNING_UP_PROGRESS")}/>;
        }
        return <Button text={t('SIGN_UP')} theme={buttonTheme}/>;
    }, [registrationState]);

    return <StyledRegistrationFormComponent {...defaultShowUpAnimation}>
        <form onSubmit={attemptRegistration} className={'form'} autoComplete="none">
            <Text theme={formTitleTheme} text={t('REGISTRATION')}/>

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

            <StyledQuestionWithLinkTheme>
                <Text theme={questionTextTheme} text={t('ALREADY_HAVE_ACCOUNT')}/>
                <StyledLink style={{marginLeft: 10}} to={'/'}>{t('SIGN_IN')}</StyledLink>
            </StyledQuestionWithLinkTheme>
        </form>
    </StyledRegistrationFormComponent>;
};

export default RegistrationForm;