import React, {useCallback, useEffect} from 'react';

import {useAuthSelector} from "appRedux/reducers/api/auth/accountSlice";
import {confirmAccount} from "appRedux/services/authService";
import {useAppDispatch} from "appRedux/store";
import {StyledLink} from 'components/Forms/commonStyles';
import {Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {RequestStatus} from "tools/client/client.types";

import {isSuccess, useMemoRequestState} from "../../api/api_util";

import {StyledConfirmPage, StyledConfirmPageTop, textTheme} from "./style";

const ConfirmPage = () => {

    const params = useParams();

    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const requestState = useAuthSelector('accountConfirmation');
    const pending = useMemoRequestState(requestState, RequestStatus.Waiting);
    const success = useMemoRequestState(requestState, RequestStatus.Success);

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