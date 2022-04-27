import React, {useCallback, useEffect, useState} from "react";

import { getChangeUsernameState,
    getUserState,
    resetUserSliceRequestState
} from "appRedux/reducers/api/user/userSlice";
import {closeDialog} from "appRedux/reducers/application";
import {changeUsername} from "appRedux/services/userService";
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

import {StyledChangeUsernameDialogFields, StyledChangeUsernameDialogForm} from "./style";

export const ChangeUsernameDialog = (props: DialogProps) => {

    const { onConfirm, onCancel } = props.dialog;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [allowVisible, setAllowVisible] = useState(false);

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const userState = useSelector(getUserState);
    const changeUsernameState = useSelector(getChangeUsernameState);
    const errors = changeUsernameState.info.errors;

    useEffect(() => {
        setAllowVisible(true);

        return () => {
            dispatch(resetUserSliceRequestState('changeUsernameAddress'));
        };
    }, []);

    const sendChangeUsername = useCallback((e) => {
        e.preventDefault();
        dispatch(changeUsername(username, password));
    }, [username, password]);

    useEffect(() => {
        if (isSuccess(changeUsernameState)) {
            console.log(changeUsernameState);
            //dispatch(tryResetChangeUsernameState());
            dispatch(closeDialog());
        }
    }, [changeUsernameState]);

    const renderFormErrors = useCallback(() => {
        if (!errors || !allowVisible) {
            return null;
        }

        return <FormErrors errors={errors} translation={t}/>;
    }, [errors, allowVisible]);

    const onCancelRequest = useCallback((e) => {
        if (onCancel) {
            onCancel(e);
        }
        else {
            dispatch(closeDialog());
        }
    }, [onCancel]);

    return <StyledChangeUsernameDialogForm onSubmit={sendChangeUsername}>
        <StyledChangeUsernameDialogFields>
            <InputWithError
                autoFocus={true}
                theme={editInputTheme}
                style={{ width: '100%', marginTop: 0 }}
                id={'new_username'}
                title={`${t('NEW_USERNAME')}:`}
                type={'text'}
                autoComplete={'on'}
                errors={errors}
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder={t('NEW_USERNAME_ENTER')}/>

            <InputWithError
                theme={editInputTheme}
                style={{ width: '100%', marginTop: 20 }}
                id={'password'}
                title={`${t('CURRENT_PASSWORD')}:`}
                type={'password'}
                autoComplete={'current-password'}
                value={password}
                errors={errors}
                onChange={e => setPassword(e.target.value)}
                placeholder={t('CURRENT_PASSWORD_ENTER')}/>

            {renderFormErrors()}
        </StyledChangeUsernameDialogFields>

        <StyledDialogButtonsSection>
            <Button theme={cancelButtonTheme} text={t('CANCEL')} onClick={onCancelRequest} disabled={false}/>
            <Button theme={confirmButtonTheme} type={'submit'} text={t('CONFIRM')}
                    disabled={username === '' || password === ''}/>
        </StyledDialogButtonsSection>
    </StyledChangeUsernameDialogForm>;
};