import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {getForgotPasswordState, resetUserSliceRequestState} from "appRedux/reducers/api/user/userSlice";
import {forgotPassword} from "appRedux/services/userService";
import {useAppDispatch} from "appRedux/store";
import {descriptionTextTheme} from "components/Dialogs/commonStyles";
import {showSentResetPasswordMailDialog} from "components/Dialogs/readyDialogs";
import {FormErrors} from "components/Errors/FormErrors/FormErrors";
import * as style from "components/Forms/commonStyles";
import {formTitleTheme, StyledForm, StyledQuestionWithLinkTheme} from 'components/Forms/commonStyles';
import {InputWithError} from 'components/InputWithError/InputWithError';
import {Button, Spinner, Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RequestStatus} from "tools/client/client.types";

import {isSuccess, isWaiting} from "../../api/api_util";
import {getConfig, FORM_CONFIG} from "../../api/formConfig";

import {StyledForgotPasswordPage} from "./style";

const ForgotPasswordPage = () => {

    const { t } = useTranslation();

    let navigate = useNavigate();

    const [email, setEmail] = useState('');

    const forgotPasswordState = useSelector(getForgotPasswordState);
    const errors = forgotPasswordState.info.errors;

    const cfg = useMemo(() => getConfig(FORM_CONFIG, 'forgotPassword', t), [t]);

    const dispatch = useAppDispatch();

    const isRequestPending = useMemo(() => isWaiting(forgotPasswordState), [forgotPasswordState]);

    useEffect(() => {
        return () => {
            dispatch(resetUserSliceRequestState('forgotPassword'));
        };
    }, []);

    const sendResetPasswordRequest = useCallback(e => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    }, [email]);

    const renderButton = useCallback(() => {
        const isRequestPending = forgotPasswordState.info.status === RequestStatus.Waiting;

        if (isRequestPending) {
            return <div style={{ marginTop: 30 }}>
                <Spinner theme={style.spinnerTheme} text={t("SENDING_PASSWORD_RESET_REQUEST")}/>
            </div>;
        }
        return <Button text={t('FORGOT_PASSWORD_BUTTON')} theme={style.buttonTheme}
                       onClick={sendResetPasswordRequest}/>;
    }, [email, forgotPasswordState]);

    useEffect(() => {
        if (isSuccess(forgotPasswordState)) {
            showSentResetPasswordMailDialog({ dispatch, translation: t, navigate });
        }

    }, [forgotPasswordState, t]);

    return <StyledForgotPasswordPage>
        <StyledForm onSubmit={sendResetPasswordRequest}>
            <Text theme={formTitleTheme} text={t('FORGOT_PASSWORD_FORM_TITLE')}/>
            <Text theme={descriptionTextTheme} text={t('FORGOT_PASSWORD_INSTRUCTION')}/>

            <InputWithError
                value={email}
                onChange={e => setEmail(e.target.value)}
                errors={errors}
                disabled={isRequestPending}
                {...cfg['email']}/>

            <FormErrors errors={errors} translation={t}/>

            {renderButton()}

            <StyledQuestionWithLinkTheme>
                <Text theme={style.questionTextTheme} text={t('PASSWORD_JUST_REMEMBERED')}/>
                <style.StyledLink to={'/'}>{t('SIGN_IN')}</style.StyledLink>
            </StyledQuestionWithLinkTheme>
        </StyledForm>
    </StyledForgotPasswordPage>;
};

export default ForgotPasswordPage;