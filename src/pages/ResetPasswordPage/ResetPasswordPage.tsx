'use client';

import { useCallback, useEffect } from 'react';

import { Center, Flex, Text } from '@chakra-ui/react';
import { redirect } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/chakra/DelayedTransition/DelayedTransition';
import { NavLink } from '@/components/chakra/NavLink/NavLink';
import Form from '@/components/Forms/Form/Form';
import { useFormConfig } from '@/form/formConfig';
import { getUser, resetPassword, verifyResetPasswordToken } from '@/queries/account';

type ResetPasswordPageProps = {
    token: string;
}

const ResetPasswordPage = (props: ResetPasswordPageProps) => {

    const { t } = useTranslation();

    const { token } = props;

    console.log('Reset password token: ', token);

    const formConfig = useFormConfig('resetPassword', t);

    const { data: user } = getUser();

    const {
        isIdle: resetPasswordIdle,
        isLoading: resetPasswordLoading,
        error: resetPasswordError,
        data: resetPasswordData,
        isSuccess: resetPasswordSuccess,
        mutate: resetPasswordMutate
    } = resetPassword();

    const {
        isIdle: verifyResetPasswordTokenIdle,
        isLoading: verifyTokenLoading,
        error: verifyTokenError,
        data: verifyTokenData,
        isSuccess: verifyTokenSuccess,
        mutate: verifyTokenMutate
    } = verifyResetPasswordToken();

    const onSubmit = useCallback((formData: any) => {
        // Get form data
        const { new_password, new_password_confirm } = formData;

        if (!token) {
            console.error('No key');
            return;
        }

        const decodedToken = decodeURIComponent(token);
        const uid = decodedToken.split(':')[0];
        const tok = decodedToken.split(':')[1];

        resetPasswordMutate({
            new_password1: new_password,
            new_password2: new_password_confirm,
            uid: uid,
            token: tok
        });
    }, [token]);

    useEffect(() => {
        if (!token) {
            console.log('No token');
            return;
        }

        const decodedToken = decodeURIComponent(token);
        const uid = decodedToken.split(':')[0];
        const tok = decodedToken.split(':')[1];

        verifyTokenMutate({ uid: uid, token: tok });
    }, [token]);

    if (verifyTokenLoading || verifyResetPasswordTokenIdle) {
        return <DelayedTransition pending={true}
            position={'absolute'}
            bottom={0}
            left={0}
            p={0} w={'100%'}/>;
    }

    if (verifyTokenError) {
        console.log('Error: ', verifyTokenError);
        return null;
    }

    if (verifyTokenSuccess) {

        if (resetPasswordSuccess) {
            return redirect('/');
        }

        return <Center w={'100%'} h={'100%'}>
            <Flex borderRadius={{ base: 0, sm: 8 }}
                direction={'column'}
                bg={'#2a2a2a'}
                width={{ base: '100%', sm: '400px' }}
                p={'40px'}
                gap={'30px'}>

                <Text textAlign={'center'} fontWeight={'bold'} fontSize={'2xl'}>{'Set up new password'}</Text>

                <Form
                    config={formConfig}
                    submitButtonTextKey={'SET_NEW_PASSWORD'}
                    error={resetPasswordError?.data}
                    fieldBg={'#212121'}
                    disabled={resetPasswordLoading}
                    useCancelButton={false}
                    buttonsStackProps={{
                        m: 0,
                        justifyContent: 'center',
                    }}
                    buttonProps={{
                        bg: '#434343',
                        w: '250px',
                        h: '50px',
                        justifySelf: 'flex-end',
                        borderRadius: '100px',
                        fontSize: 'md'
                    }}
                    onSubmit={onSubmit}/>

                {!user && <NavLink color={'#77a4df'}
                    alignSelf={'center'}
                    fontWeight={'semibold'}
                    href={'/'}>
                    {'Back to login'}
                </NavLink>}

                <DelayedTransition pending={resetPasswordLoading}
                    position={'absolute'}
                    bottom={0}
                    left={0}
                    p={0} w={'100%'}/>
            </Flex>
        </Center>;
    }

};

export default ResetPasswordPage;