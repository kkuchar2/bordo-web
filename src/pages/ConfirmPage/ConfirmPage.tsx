import React, {useCallback, useEffect} from 'react';

import {selectorConfirmAccount, tryConfirmAccount} from "appRedux/reducers/api/account";
import {RequestStatus} from "appRedux/reducers/generic_reducer";
import { StyledLink } from 'components/Forms/commonStyles';
import {Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import {StyledConfirmPage, StyledConfirmPageTop, textTheme} from "./style";

const ConfirmPage = () => {

    const params = useParams();

    const dispatch = useDispatch();

    const {t} = useTranslation();

    const confirmationState = useSelector(selectorConfirmAccount);

    useEffect(() => {
        dispatch(tryConfirmAccount({token: params.token}));
    }, []);

    const renderContent = useCallback(() => {
        const isSuccess = confirmationState.requestState.status === RequestStatus.Success;
        const isPending = confirmationState.requestState.pending;

        if (isPending) {
            return  <Text theme={textTheme} text={t('ACTIVATING')}/>;
        }
        else if (isSuccess) {

            const response = confirmationState.responseData.data;

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
    }, [confirmationState]);

    return <StyledConfirmPage>
        <StyledConfirmPageTop>
            {renderContent()}
        </StyledConfirmPageTop>

    </StyledConfirmPage>;
};

export default ConfirmPage;