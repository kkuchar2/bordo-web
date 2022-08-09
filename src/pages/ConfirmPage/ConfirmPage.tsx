import React, {useCallback, useEffect} from 'react';

import {Text} from '@chakra-ui/react';
import {NavLink} from 'components/chakra/NavLink/NavLink';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {confirmAccount} from 'state/services/accountService';
import {RootState, useAppDispatch} from 'state/store';
import {RequestStatus} from 'tools/client/client.types';

import {isSuccess, useRequestState} from '../../api/api_util';

import {StyledConfirmPage, StyledConfirmPageTop} from './style';

const ConfirmPage = () => {

    const params = useParams();

    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const requestState = useSelector((state: RootState) => state.account.requests.accountConfirmation);
    const pending = useRequestState(requestState, RequestStatus.Waiting);

    useEffect(() => {
        dispatch(confirmAccount(params.token));
    }, []);

    const renderContent = useCallback(() => {
        const success = isSuccess(requestState);

        if (pending) {
            return <Text>{t('ACTIVATING')}</Text>;
        }
        else if (success) {

            const response = requestState.responseData.data;

            return <>
                <Text>{t(response)}</Text>
                <NavLink to={'/'}>{t('SIGN_IN')}</NavLink>
            </>;
        }
        else {
            return <>
                <Text>{'Error confirming account'}</Text>
                <NavLink to={'/'}>{t('SIGN_IN')}</NavLink>
            </>;
        }
    }, [requestState]);

    return <StyledConfirmPage>
        <StyledConfirmPageTop>
            {renderContent()}
        </StyledConfirmPageTop>

    </StyledConfirmPage>;
};

export default ConfirmPage;