import React, { useCallback, useEffect } from 'react';

import { VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/chakra/DelayedTransition/DelayedTransition';
import Form from '@/components/Forms/Form/Form';
import { useFormConfig } from '@/form/formConfig';
import { createGroup } from '@/queries/groups';
import { closeDialog } from '@/state/reducers/dialog/dialogSlice';
import { useAppDispatch } from '@/state/store';

export const CreateGroupDialog = () => {

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const router = useRouter();

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
            router.push('/');
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