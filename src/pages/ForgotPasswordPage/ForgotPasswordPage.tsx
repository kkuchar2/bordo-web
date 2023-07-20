'use client';

import { useCallback, useEffect } from 'react';

import { Center, Flex, Progress, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { CenterFlex } from '@/components/chakra/CenterFlex/CenterFlex';
import { NavLink } from '@/components/chakra/NavLink/NavLink';
import { showDialogAfterPasswordResetRequest } from '@/components/DialogSystem/readyDialogs';
import Form from '@/components/Forms/Form/Form';
import { useFormConfig } from '@/form/formConfig';
import { forgotPassword } from '@/queries/account';

const ForgotPassword = () => {

    const {
        isLoading: forgotPasswordPending,
        error: forgotPasswordError,
        isSuccess: forgotPasswordSuccess,
        mutate: forgotPasswordMutate
    } = forgotPassword();

    const { t } = useTranslation();

    const formConfig = useFormConfig('forgotPassword', t);

    const requestPasswordReset = useCallback((formData: any) => {
        const { email } = formData;
        forgotPasswordMutate({
            email: email,
        });
    }, []);

    useEffect(() => {
        if (forgotPasswordSuccess) {
            showDialogAfterPasswordResetRequest();
        }

    }, [forgotPasswordSuccess, t]);

    return <Center w={'100%'} h={'100%'}>
        <Flex borderRadius={{ base: 0, sm: 8 }}
            direction={'column'}
            bg={'#2a2a2a'}
            width={{ base: '100%', sm: '400px' }}
            p={'40px'}
            gap={'40px'}>
            <VStack align={'stretch'} spacing={'20px'}>
                <Form
                    title={t('RESET_PASSWORD')}
                    description={t('RESET_PASSWORD_DESCRIPTION')}
                    submitButtonTextKey={'RESET_PASSWORD'}
                    error={forgotPasswordError?.data}
                    disabled={forgotPasswordPending}
                    fieldBg={'#232323'}
                    config={formConfig}
                    useCancelButton={false}
                    onSubmit={requestPasswordReset}
                    buttonProps={{
                        bg: '#434343',
                        w: '250px',
                        h: '50px',
                        justifySelf: 'flex-end',
                        borderRadius: '100px',
                        fontSize: 'md'
                    }}
                    buttonsStackProps={{
                        m: 0,
                        mb: '20px',
                        justifyContent: 'center',
                    }}/>

                <CenterFlex gap={'20px'}>
                    <NavLink color={'#77a4df'}
                        fontSize={'md'}
                        fontWeight={'semibold'}
                        href={'/'}>
                        {t('GO_BACK')}
                    </NavLink>
                </CenterFlex>

                {forgotPasswordPending ? <Progress size={'xs'} isIndeterminate/> : null}
            </VStack>
        </Flex>
    </Center>;
};

ForgotPassword.displayName = 'ForgotPassword';

export default ForgotPassword;