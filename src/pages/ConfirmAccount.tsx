import React, {useEffect} from 'react';

import {DelayedTransition} from 'components/chakra/DelayedTransition/DelayedTransition';
import {showErrorToast} from 'components/Toast/readyToastNotifications';
import {useNavigate, useParams} from 'react-router-dom';

import {confirmAccount} from '../queries/account';

const ConfirmAccount = () => {

    const params = useParams();

    const navigate = useNavigate();

    const { isIdle, isLoading, error, isError, isSuccess, mutate } = confirmAccount();

    useEffect(() => {
        console.log('Veryfing with token: ', params.token);
        mutate({
            key: params.token
        });
    }, [params]);

    useEffect(() => {
        if (isError) {
            showErrorToast('Verification link invalid or expired');
            navigate('/');
        }
    }, [isError]);

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }
    }, [isSuccess]);

    return isLoading && <DelayedTransition pending={true}
                                           position={'absolute'}
                                           bottom={0}
                                           left={0}
                                           p={0} w={'100%'}/>;
};

export default ConfirmAccount;