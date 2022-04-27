import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {getRegistrationState, resetUserSliceRequestState} from 'appRedux/reducers/api/user/userSlice';
import {register} from "appRedux/services/userService";
import {useAppDispatch} from "appRedux/store";
import {showRegistrationCompleteDialog} from "components/Dialogs/readyDialogs";
import {FormErrors} from "components/Errors/FormErrors/FormErrors";
import {
    buttonTheme,
    formTitleTheme,
    questionTextTheme,
    spinnerTheme,
    StyledButtonGroup,
    StyledCenteredSection,
    StyledForm,
    StyledLink,
    StyledQuestionWithLinkTheme
} from "components/Forms/commonStyles";
import {InputWithError} from 'components/InputWithError/InputWithError';
import {EnsureAuthorized} from "hoc/EnsureAuthorized";
import {Button, Spinner, Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {isSuccess, isWaiting} from "../../api/api_util";
import {FORM_CONFIG, getConfig} from "../../api/formConfig";

import {StyledRegistrationPage} from "./style";

const RegistrationPage = () => {

    const { t } = useTranslation();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const registrationState = useSelector(getRegistrationState);
    const isRequestPending = useMemo(() => isWaiting(registrationState), [registrationState]);
    const errors = registrationState.info.errors;

    const cfg = useMemo(() => getConfig(FORM_CONFIG, 'registration', t), [t]);

    useEffect(() => {
        return () => {
            dispatch(resetUserSliceRequestState('registration'));
        };
    }, []);

    useEffect(() => {
        if (isSuccess(registrationState)) {
            showRegistrationCompleteDialog({ dispatch, translation: t, navigate });
        }
    }, [registrationState, t]);

    const registerNewUser = useCallback((e: any) => {
        e.preventDefault();
        dispatch(register(email, username, password));
    }, [email, username, password]);

    const renderSignUpButton = useCallback(() => {
        if (isRequestPending) {
            return <Spinner theme={spinnerTheme} text={t("SIGNING_UP_PROGRESS")}/>;
        }
        return <Button type={'submit'} text={t('SIGN_UP')} theme={buttonTheme}/>;
    }, [registrationState]);

    return <StyledRegistrationPage>
        <StyledCenteredSection>
            <StyledForm onSubmit={registerNewUser}>
                <Text theme={formTitleTheme} text={t('REGISTRATION')}/>

                <InputWithError
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    errors={errors}
                    disabled={isRequestPending}
                    {...cfg['email']}/>

                <InputWithError
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    errors={errors}
                    disabled={isRequestPending}
                    {...cfg['username']}/>

                <InputWithError
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    errors={errors}
                    disabled={isRequestPending}
                    {...cfg['password']}/>

                <FormErrors errors={errors} translation={t}/>

                <StyledButtonGroup>{renderSignUpButton()}</StyledButtonGroup>

                <StyledQuestionWithLinkTheme>
                    <Text theme={questionTextTheme} disabled={isRequestPending} text={t('ALREADY_HAVE_ACCOUNT')}/>
                    <StyledLink disabled={isRequestPending} style={{ marginLeft: 10 }}
                                to={'/'}>{t('SIGN_IN')}</StyledLink>
                </StyledQuestionWithLinkTheme>
            </StyledForm>
        </StyledCenteredSection>
    </StyledRegistrationPage>;
};

export default EnsureAuthorized(RegistrationPage) as React.FC;