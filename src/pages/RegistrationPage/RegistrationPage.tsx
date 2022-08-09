import React, {useCallback, useEffect} from 'react';

import {Heading, Text, VStack} from '@chakra-ui/react';
import {CenterFlex} from 'components/chakra/CenterFlex/CenterFlex';
import {NavLink} from 'components/chakra/NavLink/NavLink';
import {showRegistrationCompleteDialog} from 'components/DialogSystem/readyDialogs';
import Form from 'components/Forms/Form/Form';
import GoogleButton from 'components/GoogleButton/GoogleButton';
import {EnsureAuthorized} from 'hoc/EnsureAuthorized';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {googleLogin, register, resetAccountSliceRequestState} from 'state/services/accountService';
import {RootState, useAppDispatch} from 'state/store';
import styled from 'styled-components';
import {RequestStatus} from 'tools/client/client.types';

import {isSuccess, useRequestState} from '../../api/api_util';
import {useFormConfig} from '../../api/formConfig';
import {GOOGLE_CLIENT_ID} from '../../config';
import UserAgreements from '../LoginPage/UserAgreements';

const StyledGB = styled.div`
  border: 2px solid red;
  padding: 20px;

`;
const RegistrationPage = () => {

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const requestState = useSelector((state: RootState) => state.account.requests.registration);

    const errors = requestState.info.errors;

    const pending = useRequestState(requestState, RequestStatus.Waiting);

    const formConfig = useFormConfig('registration', t);

    useEffect(() => {
        return () => {
            dispatch(resetAccountSliceRequestState('registration'));
        };
    }, []);

    useEffect(() => {
        if (isSuccess(requestState)) {
            showRegistrationCompleteDialog();
        }
    }, [requestState, t]);

    const attemptRegister = useCallback((formData: any) => {
        const { email, username, password } = formData;
        dispatch(register(email, username, password));
    }, []);

    const onSignInWithGoogle = useCallback((credentialResponse: any) => {
        dispatch(googleLogin(credentialResponse));
    }, []);

    return <CenterFlex width={'100%'} height={'100%'}>
        <VStack borderRadius={8}
                bg={'#333333'}
                align={'stretch'}
                width={'450px'}
                padding={'20px'}
                spacing={'20px'}>
            <Heading fontSize={'2xl'}>{t('REGISTRATION')}</Heading>
            <UserAgreements/>

            <Form
                submitButtonText={t('SIGN_UP')}
                errors={errors}
                disabled={pending}
                config={formConfig}
                useCancelButton={false}
                onSubmit={attemptRegister}/>

            <GoogleButton
                clientId={GOOGLE_CLIENT_ID}
                context={'signin'}
                text={'signin_with'}
                className={'mt-8 flex justify-center'}
                onSuccess={onSignInWithGoogle}/>

            <CenterFlex gap={'20px'}>
                <Text>{t('ALREADY_HAVE_ACCOUNT')}</Text>
                <NavLink to={'/'}>{t('SIGN_IN')}</NavLink>
            </CenterFlex>
        </VStack>
    </CenterFlex>;
};

export default EnsureAuthorized(RegistrationPage) as React.FC;