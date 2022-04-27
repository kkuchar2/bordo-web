import React, {useCallback, useEffect, useMemo, useState} from "react";

import {
    getChangeEmailAddressState,
    getUserState,
    resetUserSliceRequestState
} from "appRedux/reducers/api/user/userSlice";
import {closeDialog} from "appRedux/reducers/application";
import {changeEmailAddress} from "appRedux/services/userService";
import {useAppDispatch} from "appRedux/store";
import {cancelButtonTheme, confirmButtonTheme} from "components/Dialogs/commonStyles";
import {StyledDialogButtonsSection} from "components/Dialogs/style";
import {FormErrors} from "components/Errors/FormErrors/FormErrors";
import {InputWithError} from "components/InputWithError/InputWithError";
import {Button} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

import {isSuccess, isWaiting} from "../../../api/api_util";
import {FORM_CONFIG, getConfig} from "../../../api/formConfig";

import {StyledChangeEmailDialogFields, StyledChangeEmailDialogForm} from "./style";

export const ChangeEmailDialog = () => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const [allowVisible, setAllowVisible] = useState(false);

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const userState = useSelector(getUserState);
    const changeEmailState = useSelector(getChangeEmailAddressState);
    const errors = changeEmailState.info.errors;

    const isRequestPending = useMemo(() => isWaiting(changeEmailState), [changeEmailState]);

    const cfg = useMemo(() => getConfig(FORM_CONFIG, 'changeEmail', t), [t]);

    useEffect(() => {
        setAllowVisible(true);

        return () => {
            dispatch(resetUserSliceRequestState('changeEmailAddress'));
        };
    }, []);

    const sendChangeEmail = useCallback((e) => {
        e.preventDefault();
        dispatch(changeEmailAddress(userState.email.email, email, password));
    }, [email, password]);

    useEffect(() => {
        if (isSuccess(changeEmailState)) {
            dispatch(closeDialog());
        }
    }, [changeEmailState]);

    const renderFormErrors = useCallback(() => {
        if (!errors || !allowVisible) {
            return null;
        }

        return <FormErrors errors={errors} translation={t}/>;
    }, [errors, allowVisible]);

    const onCancelRequest = useCallback((e) => {
        dispatch(closeDialog());
    }, []);

    return <StyledChangeEmailDialogForm onSubmit={sendChangeEmail}>
        <StyledChangeEmailDialogFields>
            <InputWithError
                value={email}
                onChange={e => setEmail(e.target.value)}
                errors={errors}
                disabled={isRequestPending}
                {...cfg['email']}/>

            <InputWithError
                value={password}
                onChange={e => setPassword(e.target.value)}
                errors={errors}
                disabled={isRequestPending}
                {...cfg['password']}/>

            {renderFormErrors()}
        </StyledChangeEmailDialogFields>

        <StyledDialogButtonsSection>
            <Button theme={cancelButtonTheme} text={t('CANCEL')} onClick={onCancelRequest} disabled={false}/>
            <Button theme={confirmButtonTheme} type={'submit'} text={t('CONFIRM')} disabled={false}/>
        </StyledDialogButtonsSection>
    </StyledChangeEmailDialogForm>;
};