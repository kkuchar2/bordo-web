import React, {useCallback, useEffect, useState} from "react";

import {
    getDisableAccountState, getUserState,
    resetUserSliceRequestState
} from "appRedux/reducers/api/user/userSlice";
import {closeDialog} from "appRedux/reducers/application";
import {disableAccount} from "appRedux/services/userService";
import {useAppDispatch} from "appRedux/store";
import {cancelButtonTheme, confirmButtonTheme} from "components/Dialogs/commonStyles";
import {StyledDialogButtonsSection} from "components/Dialogs/style";
import {editInputTheme} from "components/EditableProperties/EditableTextProperty/style";
import {InputWithError} from "components/InputWithError/InputWithError";
import {Button} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

import {isFailure} from "../../../api/api_util";

import {
    StyledDisableAccountDialogFormContent,
    StyledDisableAccountDialogFields,
    StyledDisableAccountDialogForm,
    StyledDisableAccountWarningText
} from "./style";

export const DisableAccountDialog = () => {

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const [password, setPassword] = useState('');

    const userState = useSelector(getUserState);
    const disableAccountState = useSelector(getDisableAccountState);
    const errors = disableAccountState.info.errors;

    useEffect(() => {
        return () => {
            dispatch(resetUserSliceRequestState('disableAccount'));
        };
    }, []);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch(disableAccount(userState.email.email, password));
    }, [userState, password]);

    const onCancelRequest = useCallback((e) => {
        dispatch(closeDialog());
    }, []);

    useEffect(() => {
        if (isFailure(disableAccountState)) {
            dispatch(closeDialog());
        }
    }, [disableAccountState]);

    return <StyledDisableAccountDialogForm onSubmit={onSubmit}>

        <StyledDisableAccountDialogFormContent>
            <StyledDisableAccountWarningText>
                {t('DISABLE_ACCOUNT_WARNING')}
            </StyledDisableAccountWarningText>

            <StyledDisableAccountDialogFields>
                <InputWithError
                    theme={editInputTheme}
                    style={{ width: '100%', marginTop: 20 }}
                    id={'password'}
                    title={`${t('PASSWORD')}:`}
                    type={'password'}
                    value={password}
                    errors={errors}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={t('CURRENT_PASSWORD_ENTER')}/>
            </StyledDisableAccountDialogFields>
        </StyledDisableAccountDialogFormContent>
        <StyledDialogButtonsSection>
            <Button theme={cancelButtonTheme} text={t('CANCEL')} onClick={onCancelRequest} disabled={false}/>
            <Button theme={confirmButtonTheme} type={'submit'} text={t('CONFIRM')} disabled={password === ''}/>
        </StyledDialogButtonsSection>
    </StyledDisableAccountDialogForm>;
};