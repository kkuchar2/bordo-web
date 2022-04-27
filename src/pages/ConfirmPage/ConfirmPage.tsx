import React, {useCallback, useEffect} from 'react';

import {getConfirmationState} from "appRedux/reducers/api/user/userSlice";
import {confirmAccount} from "appRedux/services/userService";
import {useAppDispatch} from "appRedux/store";
import { StyledLink } from 'components/Forms/commonStyles';
import {Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import { useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import {isWaiting, isSuccess} from "../../api/api_util";

import {StyledConfirmPage, StyledConfirmPageTop, textTheme} from "./style";

const ConfirmPage = () => {

    const params = useParams();

    const dispatch = useAppDispatch();

    const {t} = useTranslation();

    const confirmationState = useSelector(getConfirmationState);

    useEffect(() => {
        dispatch(confirmAccount(params.token));
    }, []);

    const renderContent = useCallback(() => {
        const success = isSuccess(confirmationState);
        const pending = isWaiting(confirmationState);

        if (pending) {
            return  <Text theme={textTheme} text={t('ACTIVATING')}/>;
        }
        else if (success) {

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