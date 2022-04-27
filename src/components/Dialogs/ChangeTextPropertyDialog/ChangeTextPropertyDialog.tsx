import React, {useCallback, useEffect, useState} from "react";

import {
    getChangeEmailAddressState,
    getUserState,
    resetUserSliceRequestState
} from "appRedux/reducers/api/user/userSlice";
import {closeDialog} from "appRedux/reducers/application";
import { changeEmailAddress } from "appRedux/services/userService";
import {useAppDispatch} from "appRedux/store";
import {cancelButtonTheme, confirmButtonTheme} from "components/Dialogs/commonStyles";
import {StyledDialogButtonsSection} from "components/Dialogs/style";
import {DialogProps} from "components/Dialogs/types";
import {editInputTheme} from "components/EditableProperties/EditableTextProperty/style";
import {FormErrors} from "components/Errors/FormErrors/FormErrors";
import {InputWithError} from "components/InputWithError/InputWithError";
import {Button} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

import {isSuccess} from "../../../api/api_util";

import {StyledChangeEmailDialogForm} from "./style";

export const ChangeTextPropertyDialog = (props: DialogProps) => {

    const {onConfirm, onCancel} = props.dialog;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [allowVisible, setAllowVisible] = useState(false);

    const {t} = useTranslation();

    const dispatch = useAppDispatch();

    const userState = useSelector(getUserState);
    const changeEmailState = useSelector(getChangeEmailAddressState);
    const errors = changeEmailState.info.errors;

    useEffect(() => {
        //dispatch(tryResetChangeEmailState());
        setAllowVisible(true);

        return () => {
            dispatch(resetUserSliceRequestState('changeEmailAddress'));
        };
    }, []);

    const sendChangeEmail = useCallback((e) => {
        e.preventDefault();
        dispatch(changeEmailAddress(userState.email.email, email, password));
    }, [useState, email, password]);

    useEffect(() => {
        if (isSuccess(changeEmailState)) {
            console.log(changeEmailState);
            //dispatch(tryResetChangeEmailState());
            dispatch(closeDialog());
        }
    }, [changeEmailState]);

    const renderFormErrors = useCallback(() => {
        if (!errors || !allowVisible) {
            return null;
        }

        return <FormErrors errors={errors} translation={t}/>;
    }, [errors, allowVisible]);

    return <StyledChangeEmailDialogForm onSubmit={sendChangeEmail}>
        <InputWithError
            autoFocus={true}
            theme={editInputTheme}
            style={{width: '100%', marginTop: 0}}
            id={'new_email'}
            title={`${t('NEW_EMAIL_ADDRESS')}:`}
            type={'email'}
            autoComplete={'on'}
            errors={errors}
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={t('NEW_EMAIL_ADDRESS_ENTER')}/>

        <InputWithError
            theme={editInputTheme}
            style={{width: '100%', marginTop: 20}}
            id={'password'}
            title={`${t('CURRENT_PASSWORD')}:`}
            type={'password'}
            value={password}
            errors={errors}
            onChange={e => setPassword(e.target.value)}
            placeholder={t('CURRENT_PASSWORD_ENTER')}/>

        {renderFormErrors()}

        <StyledDialogButtonsSection>
            <Button theme={cancelButtonTheme} text={t('CANCEL')} onClick={onCancel} disabled={false}/>
            <Button theme={confirmButtonTheme} type={'submit'} text={t('CONFIRM')}
                    disabled={email === '' || password === ''}/>
        </StyledDialogButtonsSection>
    </StyledChangeEmailDialogForm>;
};