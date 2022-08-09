import React, {useCallback, useEffect, useMemo} from 'react';

import {Box, Heading} from '@chakra-ui/react';
import Form from 'components/Forms/Form/Form';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {createNewPassword, resetAccountSliceRequestState} from 'state/services/accountService';
import {RootState, useAppDispatch} from 'state/store';
import {RequestStatus} from 'tools/client/client.types';

import {useRequestState} from '../../api/api_util';
import {useFormConfig} from '../../api/formConfig';

const CreateNewPasswordPage = () => {

    const { t } = useTranslation();

    const params = useParams();

    const formConfig = useFormConfig('createNewPassword', t);

    const dispatch = useAppDispatch();

    const requestState = useSelector((state: RootState) => state.account.requests.createNewPassword);

    const pending = useRequestState(requestState, RequestStatus.Waiting);

    const errors = requestState.info.errors;

    const onSubmit = useCallback((formData: any) => {
        // Get form data
        const { new_password, new_password_confirm } = formData;

        // Get token from url
        const tokenArr = params.token.split(':');
        const uid = tokenArr[0];
        const tk = tokenArr[1];

        dispatch(createNewPassword(new_password, new_password_confirm, uid, tk));

    }, [params]);

    useEffect(() => {
        return () => {
            dispatch(resetAccountSliceRequestState('createNewPassword'));
        };
    }, []);

    const renderProgress = useMemo(() => {
        if (pending) {
            // TODO: replace with loading component
            return <div>{'PROGRESS'}</div>;
        }
        return null;
    }, [pending]);

    return <div className={'w-full flex items-center justify-start'}>
        <div className={'flex flex-col w-[500px] ml-[100px] mb-[200px]'}>

            <Box>
                <Heading>{'Set up new password'}</Heading>

                <Form
                    config={formConfig}
                    submitButtonText={t('SET_NEW_PASSWORD')}
                    className={'mt-[40px]'}
                    buttonsClasses={'w-full flex justify-end mt-[20px] rounded-2xl'}
                    confirmButtonClassName={'confirmButton rounded-xl'}
                    errors={errors}
                    disabled={pending}
                    useCancelButton={false}
                    onSubmit={onSubmit}/>
                <div className={'flex'}>
                    {pending ?
                        <progress className={'progress w-full bg-gray-600 h-[20px] progress-accent'}></progress> : null}
                </div>
            </Box>
        </div>
    </div>;
};

export default CreateNewPasswordPage;