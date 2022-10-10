import React, {useCallback} from 'react';

import {Center, Flex, Text} from '@chakra-ui/react';
import {CenterFlex} from 'components/chakra/CenterFlex/CenterFlex';
import {DelayedTransition} from 'components/chakra/DelayedTransition/DelayedTransition';
import {NavLink} from 'components/chakra/NavLink/NavLink';
import Form from 'components/Forms/Form/Form';
import {renderNonFieldErrors} from 'components/Forms/util';
import GoogleButton from 'components/GoogleButton/GoogleButton';
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
              p={'40px'}
              gap={'30px'}>

            <Text textAlign={'center'} fontWeight={'bold'} fontSize={'2xl'}>{t('SIGN_IN_TO_YOUR_ACCOUNT')}</Text>

            <Form
                submitButtonTextKey={'SIGN_IN'}
                error={loginError?.data}
                config={formConfig}
                fieldBg={'#232323'}
                excludeErrors={['email_not_verified']}
                useCancelButton={false}
                onSubmit={attemptLogin}
                fieldsSpacing={'20px'}
                contentSpacing={'10px'}
                buttonProps={{
                    bg: '#434343',
                    w: '250px',
                    h: '52px',
                    justifySelf: 'flex-end',
                    borderRadius: '100px',
                    fontSize: 'md'
                }}
                buttonsStackProps={{
                    pt: { base: 2, sm: 2, md: 1, lg: '20px' },
                    m: 0,
                    justifyContent: 'center',
                }}/>

            <NavLink color={'#77a4df'}
                     fontSize={'md'}
                     fontWeight={'semibold'}
                     to={'/forgotPassword'}>
                <Text>{t('FORGOT_PASSWORD_QUESTION')}</Text>
            </NavLink>

            <GoogleButton
                clientId={GOOGLE_CLIENT_ID}
                context={'signin'}
                customText={t('CONTINUE_WITH_GOOGLE')}
                text={'signin'}
                useOneTap={true}
                onSuccess={onSignInWithGoogle}/>

            <Center mt={'-20px'}>
                {renderNonFieldErrors(googleLoginError?.data, t, [])}
            </Center>

            <CenterFlex gap={'20px'}>
                <Text fontSize={'md'} color={'#C7C7C7'}>{t('NEED_ACCOUNT')}</Text>
                <NavLink color={'#77a4df'}
                         fontSize={'md'}
                         fontWeight={'semibold'}
                         to={'/register'}>
                    {t('CREATE_ACCOUNT')}
                </NavLink>
            </CenterFlex>

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