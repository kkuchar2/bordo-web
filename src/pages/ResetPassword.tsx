import React, {useCallback, useEffect} from 'react';

import {Center, Flex, Text} from '@chakra-ui/react';
import {DelayedTransition} from 'components/chakra/DelayedTransition/DelayedTransition';
import {NavLink} from 'components/chakra/NavLink/NavLink';
import Form from 'components/Forms/Form/Form';
import {useTranslation} from 'react-i18next';
import {Navigate, useParams} from 'react-router-dom';

import {useFormConfig} from '../api/formConfig';
import {getUser, resetPassword, verifyResetPasswordToken} from '../queries/account';

const ResetPassword = () => {

    const { t } = useTranslation();

    const params = useParams();

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

        // Get token from url
        const tokenArr = params.token.split(':');
        const uid = tokenArr[0];
        const tk = tokenArr[1];

        resetPasswordMutate({
            new_password: new_password,
            new_password_confirm: new_password_confirm,
            uid: uid,
            token: tk
        });
    }, [params]);

    useEffect(() => {
        const tokenArr = params.token.split(':');
        const uid = tokenArr[0];
        const tk = tokenArr[1];

        verifyTokenMutate({ uid: uid, token: tk });
    }, []);

    if (verifyTokenLoading || verifyResetPasswordTokenIdle) {
        return <DelayedTransition pending={true}
                                   position={'absolute'}
                                   bottom={0}
                                   left={0}
                                   p={0} w={'100%'}/>;
    }

    if (verifyTokenError) {
        return <Navigate to={'/'}/>;
    }

    if (verifyTokenSuccess) {

        if (resetPasswordSuccess) {
            return <Navigate to={'/'}/>;
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
                                   to={'/'}>{'Back to login'}
                </NavLink>}

                <DelayedTransition pending={resetPasswordLoading}
                                   position={'absolute'}
                                   bottom={0}
                                   left={0}
                                   p={0} w={'100%'}/>
            </Flex>
        </Center>;
    };
};

export default ResetPassword;