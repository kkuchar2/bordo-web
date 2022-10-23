import React, {useCallback, useEffect} from 'react';

import { VStack} from '@chakra-ui/react';
import {DelayedTransition} from 'components/chakra/DelayedTransition/DelayedTransition';
import Form from 'components/Forms/Form/Form';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {closeDialog} from 'state/reducers/dialog/dialogSlice';
import {useAppDispatch} from 'state/store';

import {useFormConfig} from '../../../api/formConfig';
import {createGroup} from '../../../queries/groups';

export const CreateGroupDialog = () => {

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const {
        mutate,
        error,
        isLoading,
        isSuccess
    } = createGroup();

    const formConfig = useFormConfig('createGroup', t);

    const onSubmit = useCallback((formData: any) => {
        mutate({ ...formData });
    }, []);

    const onCancelRequest = useCallback(() => {
        dispatch(closeDialog());
    }, []);

    useEffect(() => {
        if (isSuccess) {
            dispatch(closeDialog());
            navigate('/');
        }
    }, [isSuccess]);

    return <VStack align={'stretch'} spacing={5}>
        <Form
            submitButtonTextKey={'CREATE_GROUP'}
            error={error?.data}
            config={formConfig}
            fieldBg={'#232323'}
            useCancelButton={false}
            onSubmit={onSubmit}
            fieldsSpacing={'20px'}
            contentSpacing={'10px'}
            buttonProps={{
                bg: '#434343',
                w: '250px',
                h: '52px',
                justifySelf: 'flex-end',
                borderRadius: '100px',
                fontSize: 'md'
            }}
            buttonsStackProps={{
                pt: { base: 2, sm: 2, md: 1, lg: '20px' },
                m: 0,
                justifyContent: 'center',
            }}/>
        <DelayedTransition pending={isLoading}/>
    </VStack>;
};