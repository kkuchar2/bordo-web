'use client';

import { FC, useCallback } from 'react';

import { Center, Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/chakra/DelayedTransition/DelayedTransition';
import Form from '@/components/Forms/Form/Form';
import { registrationForm } from '@/components/Forms/formConfig';
import { RegistrationFormArgs } from '@/components/Forms/formConfig.types';
import { NavLink } from '@/components/NavLink/NavLink';
import UserAgreements from '@/components/UserAgreements';
import WithAuth from '@/hoc/WithAuth';
import { register } from '@/queries/account';

const SignUpPage = () => {

    const { t } = useTranslation();

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

            <Form<RegistrationFormArgs>
                config={registrationForm}
                submitButtonTextKey={'SIGN_UP'}
                error={registerError?.data}
                disabled={registrationPending}
                useCancelButton={false}
                onSubmit={attemptRegister}/>

            <div className={'flex flex-col items-center justify-center gap-[20px]'}>
                <Text fontSize={'md'} color={'#C7C7C7'}>{t('ALREADY_HAVE_ACCOUNT')}</Text>
                <NavLink className={'font-semibold text-[#77a4df]'} href={'/'}>
                    {t('SIGN_IN')}
                </NavLink>
            </div>

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
}) as FC;