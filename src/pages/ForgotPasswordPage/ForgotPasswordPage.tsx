'use client';

import { useCallback, useEffect } from 'react';

import { Center, Flex, Progress, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { showDialogAfterPasswordResetRequest } from '@/components/DialogSystem/readyDialogs';
import Form from '@/components/Forms/Form/Form';
import { forgotPasswordForm } from '@/components/Forms/formConfig';
import { ForgotPasswordFormArgs } from '@/components/Forms/formConfig.types';
import { NavLink } from '@/components/NavLink/NavLink';
import { forgotPassword } from '@/queries/account';

const ForgotPassword = () => {

    const {
        isLoading: forgotPasswordPending,
        error: forgotPasswordError,
        isSuccess: forgotPasswordSuccess,
        mutate: forgotPasswordMutate
    } = forgotPassword();

    const { t } = useTranslation();

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
                <Form<ForgotPasswordFormArgs>
                    config={forgotPasswordForm}
                    title={t('RESET_PASSWORD')}
                    description={t('RESET_PASSWORD_DESCRIPTION')}
                    submitButtonTextKey={'RESET_PASSWORD'}
                    error={forgotPasswordError?.data}
                    disabled={forgotPasswordPending}
                    useCancelButton={false}
                    onSubmit={requestPasswordReset}
                />

                <div className={'flex flex-col items-center justify-center gap-[20px]'}>
                    <NavLink className={'font-semibold text-[#77a4df]'} href={'/'}>
                        {t('GO_BACK')}
                    </NavLink>
                </div>

                {forgotPasswordPending ? <Progress size={'xs'} isIndeterminate/> : null}
            </VStack>
        </Flex>
    </Center>;
};

export default ForgotPassword;