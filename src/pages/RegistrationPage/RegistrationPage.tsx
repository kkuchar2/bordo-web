import React, {useCallback, useEffect, useState} from 'react';

import {selectorRegistration, tryRegister} from "appRedux/reducers/api/account";
import {useAppDispatch} from "appRedux/store";
import {RequestStatus} from "axios-client-wrapper";
import EmailSentDialog from "components/Dialogs/EmailSentDialog/EmailSentDialog";
import {showRegistrationCompleteDialog} from "components/Dialogs/readyDialogs";
import {ErroredInput} from 'components/ErroredInput/ErroredInput';
import {defaultShowUpAnimation} from "components/Forms/animation";
import {
    buttonTheme,
    formFieldTheme,
    formTitleTheme, questionTextTheme,
    spinnerTheme, StyledButtonGroup, StyledForm, StyledLink, StyledQuestionWithLinkTheme
} from "components/Forms/commonStyles";
import {FormErrors} from "components/Forms/FormErrors/FormErrors";
import {EnsureAuthorized} from "hoc/EnsureAuthorized";
import {Button, Spinner, Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {AnimatedText, StyledTitles, titleTheme} from "../LoginPage/style";

import {StyledRegistrationPage} from "./style";

const RegistrationPage = () => {

    const {t} = useTranslation();

    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();

    const registrationState = useSelector(selectorRegistration);
    const isRegistrationContext = registrationState.path === 'account/register';
    const isRequestPending = registrationState.requestState.pending;
    const errors = registrationState.errors;

    const onEmailChange = useCallback(setEmail, []);

    const onPasswordChange = useCallback(setPassword, []);

    const renderEmailSentPopup = useCallback(() => {
        return <EmailSentDialog
            resetFunc={() => {
            }}
            title={"Registration successful!"}
            message={"We've sent you a link to confirm your email address. Please check your inbox."}/>;
    }, []);

    const registerNewUser = (e: any) => {
        e.preventDefault();
        dispatch(tryRegister(email, password));
    };

    useEffect(() => {
        const path = registrationState.path;
        const isRegistrationContext = path === 'account/register';
        const isSuccess = registrationState.requestState.status === RequestStatus.Success;

        if (isRegistrationContext && isSuccess) {
            showRegistrationCompleteDialog(dispatch, navigate, t);
        }

    }, [registrationState, t]);

    const renderSignUpButton = useCallback(() => {
        if (isRegistrationContext && isRequestPending) {
            return <Spinner theme={spinnerTheme} text={t("SIGNING_UP_PROGRESS")}/>;
        }
        return <Button type={'submit'} text={t('SIGN_UP')} theme={buttonTheme}/>;
    }, [registrationState]);

    const disabled = isRegistrationContext && isRequestPending;

    return <StyledRegistrationPage>
        <StyledTitles>
            <AnimatedText {...defaultShowUpAnimation}>
                <Text theme={titleTheme} text={t("PAGE_TITLE")}/>
            </AnimatedText>
        </StyledTitles>

        <StyledForm onSubmit={registerNewUser}>
            <Text theme={formTitleTheme} text={t('REGISTRATION')}/>

            <ErroredInput
                theme={formFieldTheme(disabled)}
                id={'email'}
                type={'email'}
                title={'E-mail:'}
                placeholder={t('ENTER_EMAIL_INPUT_PLACEHOLDER')}
                onChange={onEmailChange}
                errors={errors}
                disabled={disabled}
                required={true}
                autoComplete={"on"}/>

            <ErroredInput
                theme={formFieldTheme(disabled)}
                id={'password'}
                type={'password'}
                title={t('INPUT_PASSWORD_TITLE')}
                placeholder={t('ENTER_PASSWORD_INPUT_PLACEHOLDER')}
                onChange={onPasswordChange}
                errors={errors}
                disabled={disabled}
                required={true}/>

            <FormErrors errors={errors} translation={t}/>

            <StyledButtonGroup>{renderSignUpButton()}</StyledButtonGroup>

            <StyledQuestionWithLinkTheme>
                <Text theme={questionTextTheme} disabled={disabled} text={t('ALREADY_HAVE_ACCOUNT')}/>
                <StyledLink disabled={disabled} style={{marginLeft: 10}} to={'/'}>{t('SIGN_IN')}</StyledLink>
            </StyledQuestionWithLinkTheme>
        </StyledForm>
    </StyledRegistrationPage>;
};

export default EnsureAuthorized(RegistrationPage) as React.FC;