import React, {useCallback} from 'react';

import {Center, Flex, Heading, Text} from '@chakra-ui/react';
import {CenterFlex} from 'components/chakra/CenterFlex/CenterFlex';
import {DelayedTransition} from 'components/chakra/DelayedTransition/DelayedTransition';
import {NavLink} from 'components/chakra/NavLink/NavLink';
import Form from 'components/Forms/Form/Form';
import {renderNonFieldErrors} from 'components/Forms/util';
import GoogleButton from 'components/GoogleButton/GoogleButton';
import UserAgreements from 'components/UserAgreements';
import {googleLogin, login} from 'queries/account';
import {useTranslation} from 'react-i18next';

import {useFormConfig} from '../api/formConfig';
import {queryClient} from '../App';
import {GOOGLE_CLIENT_ID} from '../config';
import WithAuth from '../hoc/WithAuth';

const Index = () => {

    const { t } = useTranslation();

    const formConfig = useFormConfig('login', t);

    const {
        isIdle: googleLoginIdle,
        isLoading: googleLoginPending,
        error: googleLoginError,
        isSuccess: googleLoginSuccess,
        mutate: googleLoginMutate,
        reset: googleLoginReset
    } = googleLogin();

    const {
        isIdle: loginIdle,
        isLoading: loginPending,
        error: loginError,
        isSuccess: loginSuccess,
        mutate: loginMutate,
        reset: loginReset
    } = login();

    const attemptLogin = useCallback((formData: any) => {
        const { username_or_email, password } = formData;
        queryClient.removeQueries(['googleLogin']);
        googleLoginReset();
        loginMutate({ username_or_email, password });
    }, []);

    const onSignInWithGoogle = useCallback((credentialResponse: any) => {
        loginReset();
        googleLoginMutate(credentialResponse);
    }, []);

    return <Center w={'100%'} h={'100%'}>
        <Flex borderRadius={{ base: 0, sm: 8 }}
              direction={'column'}
              bg={'#2a2a2a'}
              width={{ base: '100%', sm: '400px' }}
              padding={'20px'}
              gap={'30px'}>

            <Heading fontSize={'2xl'}>{t('SIGN_IN')}</Heading>

            <Form
                submitButtonText={t('SIGN_IN')}
                error={loginError?.data}
                config={formConfig}
                fieldBg={'#353535'}
                excludeErrors={['email_not_verified']}
                useCancelButton={false}
                onSubmit={attemptLogin}
                fieldsSpacing={'20px'}
                contentSpacing={'10px'}
                buttonsStackProps={{
                    pt: { base: 2, sm: 2, md: 1, lg: '20px' },
                    m: 0
                }}/>

            <NavLink color={'#77a4df'}
                     fontSize={'sm'}
                     fontWeight={'semibold'}
                     to={'/forgotPassword'}>
                <Text>{t('FORGOT_PASSWORD_QUESTION')}</Text>
            </NavLink>

            <GoogleButton
                clientId={GOOGLE_CLIENT_ID}
                context={'signin'}
                text={'continue_with'}
                onSuccess={onSignInWithGoogle}/>

            <Center mt={'-20px'}>
                {renderNonFieldErrors(googleLoginError?.data, [], t)}
            </Center>

            <CenterFlex gap={'20px'}>
                <Text fontSize={'sm'} color={'#C7C7C7'}>{t('NEED_ACCOUNT')}</Text>
                <NavLink color={'#36b29b'}
                         fontSize={'sm'}
                         fontWeight={'semibold'}
                         to={'/register'}>
                    {t('CREATE_ACCOUNT')}
                </NavLink>
            </CenterFlex>

            <UserAgreements/>
            {(loginPending || googleLoginPending) &&
                <DelayedTransition pending={true}
                                   position={'absolute'}
                                   bottom={0}
                                   left={0}
                                   p={0} w={'100%'}/>}
        </Flex>
    </Center>;
};

Index.displayName = 'LoginPage';

export default WithAuth(Index, {
    redirectToHomeOnAutologin: true,
    redirectToLoginPageOnUnauthenticated: false
}) as React.FC;