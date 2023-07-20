'use client';

import { useCallback } from 'react';

import { Center, Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { CenterFlex } from '@/components/chakra/CenterFlex/CenterFlex';
import { DelayedTransition } from '@/components/chakra/DelayedTransition/DelayedTransition';
import { NavLink } from '@/components/chakra/NavLink/NavLink';
import Form from '@/components/Forms/Form/Form';
import UserAgreements from '@/components/UserAgreements';
import { useFormConfig } from '@/form/formConfig';
import WithAuth from '@/hoc/WithAuth';
import { register } from '@/queries/account';

const SignUpPage = () => {

    const { t } = useTranslation();

    const formConfig = useFormConfig('registration', t);

    const {
        isIdle: registerIdle,
        isLoading: registrationPending,
        error: registerError,
        isSuccess: registerSuccess,
        mutate: registerMutate
    } = register();

    const attemptRegister = useCallback((formData: any) => {
        const { email, username, password } = formData;
        registerMutate({
            email: email,
            username: username,
            password: password
        });
    }, []);

    return <Center w={'100%'} h={'100%'}>
        <Flex borderRadius={{ base: 0, sm: 8 }}
            direction={'column'}
            bg={'#2a2a2a'}
            width={{ base: '100%', sm: '400px' }}
            p={'40px'}
            gap={'30px'}>
            <Heading fontSize={'2xl'}>{t('REGISTRATION')}</Heading>

            <Form
                submitButtonTextKey={'SIGN_UP'}
                error={registerError?.data}
                disabled={registrationPending}
                fieldBg={'#232323'}
                config={formConfig}
                useCancelButton={false}
                onSubmit={attemptRegister}
                fieldsSpacing={'20px'}
                contentSpacing={'10px'}
                buttonProps={{
                    bg: '#434343',
                    w: '250px',
                    h: '50px',
                    justifySelf: 'flex-end',
                    borderRadius: '100px',
                    fontSize: 'md'
                }}
                buttonsStackProps={{
                    pt: { base: 2, sm: 2, md: 1, lg: '20px' },
                    m: 0,
                    justifyContent: 'center',
                }}/>

            <CenterFlex gap={'20px'}>
                <Text fontSize={'md'} color={'#C7C7C7'}>{t('ALREADY_HAVE_ACCOUNT')}</Text>
                <NavLink color={'#77a4df'} fontSize={'md'} fontWeight={'semibold'} href={'/'}>{t('SIGN_IN')}</NavLink>
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

export default WithAuth(SignUpPage, {
    redirectToHomeOnAutologin: true,
    redirectToLoginPageOnUnauthenticated: false
}) as React.FC;