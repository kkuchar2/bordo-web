import React, {useCallback, useEffect} from 'react';

import {Flex, Progress, Text} from '@chakra-ui/react';
import {CenterFlex} from 'components/chakra/CenterFlex/CenterFlex';
import {NavLink} from 'components/chakra/NavLink/NavLink';
import {showDialogAfterPasswordResetRequest} from 'components/DialogSystem/readyDialogs';
import Form from 'components/Forms/Form/Form';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {forgotPassword, resetAccountSliceRequestState} from 'state/services/accountService';
import {RootState, useAppDispatch} from 'state/store';
import {RequestStatus} from 'tools/client/client.types';

import {isSuccess, useRequestState} from '../../api/api_util';
import {useFormConfig} from '../../api/formConfig';

const ForgotPasswordPage = () => {

    const requestState = useSelector((state: RootState) => state.account.requests.forgotPassword);

    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const pending = useRequestState(requestState, RequestStatus.Waiting);

    const requestErrors = requestState.info.errors;

    const formConfig = useFormConfig('forgotPassword', t);

    useEffect(() => {
        return () => {
            dispatch(resetAccountSliceRequestState('forgotPassword'));
        };
    }, []);

    const requestPasswordReset = useCallback((formData: any) => {
        const { email } = formData;
        dispatch(forgotPassword(email));
    }, []);

    useEffect(() => {
        if (isSuccess(requestState)) {
            showDialogAfterPasswordResetRequest();
        }

    }, [requestState, t]);

    return <CenterFlex width={'100%'} height={'100%'}>
        <Flex direction={'column'} bg={'#333333'} padding={'20px'} gap={'20px'}>
            <Flex direction={'column'} width={'400px'} gap={'20px'}>
                <Form
                    title={t('RESET_PASSWORD')}
                    description={t('RESET_PASSWORD_DESCRIPTION')}
                    submitButtonText={t('RESET_PASSWORD')}
                    errors={requestErrors}
                    disabled={pending}
                    config={formConfig}
                    useCancelButton={false}
                    onSubmit={requestPasswordReset}/>

                <CenterFlex gap={'20px'}>
                    <Text>{t('PASSWORD_JUST_REMEMBERED')}</Text>
                    <NavLink to={'/'}>{t('SIGN_IN')}</NavLink>
                </CenterFlex>

                {pending ? <Progress size={'xs'} isIndeterminate/> : null}
            </Flex>
        </Flex>
    </CenterFlex>;
};

export default ForgotPasswordPage;