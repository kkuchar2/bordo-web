import React, {useCallback, useEffect} from 'react';

import {Center, Heading, VStack} from '@chakra-ui/react';
import {DelayedTransition} from 'components/chakra/DelayedTransition/DelayedTransition';
import {FullSizeDelayedSpinner} from 'components/chakra/DelayedTransition/FullSizeDelayedSpinner';
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
        isLoading: resetPasswordLoading,
        error: resetPasswordError,
        data: resetPasswordData,
        isSuccess: resetPasswordSuccess,
        mutate: resetPasswordMutate
    } = resetPassword();

    const {
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

    if (verifyTokenLoading) {
        return <FullSizeDelayedSpinner pending={true}/>;
    }

    if (verifyTokenError) {
        return <Navigate to={'/'}/>;
    }

    if (resetPasswordSuccess) {
        return <Navigate to={'/'}/>;
    }

    return <Center w={'100%'} h={'100%'}>
        <VStack align={'stretch'} spacing={5} bg={'rgb(39,39,39)'} w={'600px'} p={10} borderRadius={4}>
            <Heading fontSize={'2xl'}>{'Set up new password'}</Heading>

            <Form
                config={formConfig}
                submitButtonText={t('SET_NEW_PASSWORD')}
                error={resetPasswordError?.data}
                fieldBg={'rgb(47,47,47)'}
                disabled={resetPasswordLoading}
                useCancelButton={false}
                onSubmit={onSubmit}/>

            {!user && <NavLink color={'#36b29b'}
                               alignSelf={'flex-end'}
                               fontWeight={'semibold'}
                               to={'/'}>{'Back to login'}
            </NavLink>}

            <DelayedTransition pending={resetPasswordLoading}/>
        </VStack>
    </Center>;
};

export default ResetPassword;