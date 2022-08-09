import React, {useCallback, useEffect} from 'react';

import {Heading, Text, VStack} from '@chakra-ui/react';
import {CenterFlex} from 'components/chakra/CenterFlex/CenterFlex';
import {NavLink} from 'components/chakra/NavLink/NavLink';
import {showConfirmEmailDialog} from 'components/DialogSystem/readyDialogs';
import Form from 'components/Forms/Form/Form';
import GoogleButton from 'components/GoogleButton/GoogleButton';
import {EnsureAuthorized} from 'hoc/EnsureAuthorized';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {googleLogin, login, resetAccountSliceRequestState} from 'state/services/accountService';
import {RootState, useAppDispatch} from 'state/store';
import {RequestStatus} from 'tools/client/client.types';
import {isEmailNotVerifiedError} from 'tools/errors/errors';

import {useRequestState} from '../../api/api_util';
import {useFormConfig} from '../../api/formConfig';
import {GOOGLE_CLIENT_ID} from '../../config';

import UserAgreements from './UserAgreements';

const LoginPage = () => {

    const { t } = useTranslation();

    const requestState = useSelector((state: RootState) => state.account.requests.login);
    const googleRequestState = useSelector((state: RootState) => state.account.requests.googleLogin);

    const dispatch = useAppDispatch();

    const formConfig = useFormConfig('login', t);

    const loginPending = useRequestState(requestState, RequestStatus.Waiting);
    const googleLoginPending = useRequestState(googleRequestState, RequestStatus.Waiting);

    const errors = requestState.info.errors;

    useEffect(() => {
        return () => {
            dispatch(resetAccountSliceRequestState('login'));
        };
    }, []);

    useEffect(() => {
        const isEmailNotVerified = isEmailNotVerifiedError(errors);

        if (isEmailNotVerified) {
            // TODO: fill correct email
            showConfirmEmailDialog({ data: { email: 'TODO', } });
        }
    }, [errors]);

    const attemptLogin = useCallback((formData: any) => {
        const { email, password } = formData;
        dispatch(login(email, password));
    }, []);

    const onSignInWithGoogle = useCallback((credentialResponse: any) => {
        dispatch(googleLogin(credentialResponse));
    }, []);

    return <CenterFlex width={'100%'} height={'100%'}>
        <VStack borderRadius={8}
                bg={'#333333'}
                align={'stretch'}
                width={'400px'}
                padding={'20px'}
                spacing={'20px'}>

            <Heading fontSize={'2xl'}>{t('SIGN_IN')}</Heading>
            <UserAgreements/>

            <Form
                submitButtonText={t('SIGN_IN')}
                errors={errors}
                disabled={loginPending || googleLoginPending}
                config={formConfig}
                useCancelButton={false}
                onSubmit={attemptLogin}/>

            <NavLink to={'/forgotPassword'}>{t('FORGOT_PASSWORD_QUESTION')}</NavLink>

            <GoogleButton
                clientId={GOOGLE_CLIENT_ID}
                context={'signin'}
                disabled={loginPending || googleLoginPending}
                text={'continue_with'}
                onSuccess={onSignInWithGoogle}/>

            <CenterFlex gap={'20px'}>
                <Text>{t('NEED_ACCOUNT')}</Text>
                <NavLink to={'/register'}>{t('CREATE_ACCOUNT')}</NavLink>
            </CenterFlex>
        </VStack>
    </CenterFlex>;
};

LoginPage.displayName = 'LoginPage';

export default EnsureAuthorized(LoginPage) as React.FC;