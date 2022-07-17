import React, {useCallback, useEffect} from 'react';

import {StyledLink} from 'components/Forms/commonStyles';
import {Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {confirmAccount} from "state/services/accountService";
import {RootState, useAppDispatch} from "state/store";
import {RequestStatus} from "tools/client/client.types";

import {isSuccess, useRequestState} from "../../api/api_util";

import {StyledConfirmPage, StyledConfirmPageTop, textTheme} from "./style";

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
            return <Text theme={textTheme} text={t('ACTIVATING')}/>;
        }
        else if (success) {

            const response = requestState.responseData.data;

            return <>
                <Text theme={textTheme} text={t(response)}/>
                <StyledLink to={'/'}>{t('SIGN_IN')}</StyledLink>
            </>;
        }
        else {
            return <>
                <Text theme={textTheme} text={'Error confirming account'}/>
                <StyledLink to={'/'}>{t('SIGN_IN')}</StyledLink>
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