import React, {useCallback, useEffect} from 'react';

import {Center, Flex, Heading, Text} from '@chakra-ui/react';
import {CenterFlex} from 'components/chakra/CenterFlex/CenterFlex';
import {DelayedTransition} from 'components/chakra/DelayedTransition/DelayedTransition';
import {NavLink} from 'components/chakra/NavLink/NavLink';
import {showRegistrationCompleteDialog} from 'components/DialogSystem/readyDialogs';
import Form from 'components/Forms/Form/Form';
import UserAgreements from 'components/UserAgreements';
import {useTranslation} from 'react-i18next';

import {useFormConfig} from '../api/formConfig';
import WithAuth from '../hoc/WithAuth';
import {googleLogin, register} from '../queries/account';

const Register = () => {

    const { t } = useTranslation();

    const formConfig = useFormConfig('registration', t);

    const {
        isIdle: registerIdle,
        isLoading: registrationPending,
        error: registerError,
        isSuccess: registerSuccess,
        mutate: registerMutate
    } = register();

    const {
        isIdle: googleLoginIdle,
        isLoading: googleLoginPending,
        error: googleLoginErrors,
        isSuccess: googleLoginSuccess,
        mutate: googleLoginMutate
    } = googleLogin();

    useEffect(() => {
        if (registerSuccess) {
            showRegistrationCompleteDialog();
        }
    }, [registerSuccess]);

    const attemptRegister = useCallback((formData: any) => {
        const { email, username, password } = formData;
        registerMutate({
            email: email,
            username: username,
            password: password
        });
    }, []);

    const onSignInWithGoogle = useCallback((credentialResponse: any) => {
        googleLoginMutate(credentialResponse);
    }, []);

    return <Center w={'100%'} h={'100%'}>
        <Flex borderRadius={{ base: 0, sm: 8 }}
              direction={'column'}
              bg={'#2a2a2a'}
              width={{ base: '100%', sm: '400px' }}
              padding={'20px'}
              gap={'30px'}>
            <Heading fontSize={'2xl'}>{t('REGISTRATION')}</Heading>

            <Form
                submitButtonText={t('SIGN_UP')}
                error={registerError?.data}
                disabled={registrationPending}
                fieldBg={'#353535'}
                config={formConfig}
                useCancelButton={false}
                onSubmit={attemptRegister}
                fieldsSpacing={'20px'}
                contentSpacing={'10px'}
                buttonsStackProps={{
                    pt: { base: 2, sm: 2, md: 1, lg: 1 },
                    pb: { base: 2, sm: 2, md: 4, lg: 4 },
                    m: 0
                }}/>

            <CenterFlex gap={'20px'}>
                <Text fontSize={'sm'} color={'#C7C7C7'}>{t('ALREADY_HAVE_ACCOUNT')}</Text>
                <NavLink color={'#36b29b'} fontSize={'sm'} fontWeight={'semibold'} to={'/'}>{t('SIGN_IN')}</NavLink>
            </CenterFlex>

            <UserAgreements/>
            {registrationPending && <DelayedTransition
                pending={true}
                position={'absolute'}
                bottom={0}
                left={0}
                p={0} w={'100%'}/>}
        </Flex>
    </Center>;
};

export default WithAuth(Register, {
    redirectToHomeOnAutologin: true,
    redirectToLoginPageOnUnauthenticated: false
}) as React.FC;