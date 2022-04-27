import React, {useCallback, useEffect, useMemo} from "react";

import {
    getSendConfirmationEmailState,
    getUserState,
    resetUserSliceRequestState
} from "appRedux/reducers/api/user/userSlice";
import {closeDialog} from "appRedux/reducers/application";
import {sendEmailVerification} from "appRedux/services/userService";
import {useAppDispatch} from "appRedux/store";
import {cancelButtonTheme, confirmButtonTheme} from "components/Dialogs/commonStyles";
import { showVerificationEmailSentDialog} from "components/Dialogs/readyDialogs";
import {StyledDialogButtonsSection} from "components/Dialogs/style";
import {Button} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

import {isSuccess, isWaiting} from "../../../api/api_util";
import { DialogProps } from "../types";

import {StyledSendConfirmationMailDialog, Content} from "./style";

export const SendConfirmationMailDialog = (props: DialogProps) => {

    const {data} = props;

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const userState = useSelector(getUserState);
    const sendAccountVerficationEmailState = useSelector(getSendConfirmationEmailState);

    const isRequestPending = useMemo(() => isWaiting(sendAccountVerficationEmailState), [sendAccountVerficationEmailState]);

    useEffect(() => {
        return () => {
            dispatch(resetUserSliceRequestState('accountVerificationEmail'));
        };
    }, []);

    useEffect(() => {
        if (isSuccess(sendAccountVerficationEmailState)) {
            console.log('success');
            showVerificationEmailSentDialog({ dispatch, translation: t });
        }
    }, [sendAccountVerficationEmailState]);

    const onCancelRequest = useCallback((e) => {
        e.preventDefault();
        dispatch(closeDialog());
    }, []);

    const onResendEmail = useCallback((e) => {
        e.preventDefault();
        dispatch(sendEmailVerification(data.email));
    }, [data]);

    return <StyledSendConfirmationMailDialog>
        <Content>
            Let us know this email belongs to you. Please check your email and follow the instructions to verify your email address
        </Content>

        <StyledDialogButtonsSection>
            <Button theme={confirmButtonTheme} type={'submit'} text={'Send email again'} onClick={onResendEmail}
                    disabled={false}/>
            <Button theme={cancelButtonTheme} text={t('CANCEL')} onClick={onCancelRequest} disabled={false}/>
        </StyledDialogButtonsSection>
    </StyledSendConfirmationMailDialog>;
};