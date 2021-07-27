import {
    cancelButtonTheme,
    inputTheme,
    saveButtonTheme,
    StyledPasswordChangeForm,
    StyledSaveSection,
    StyledTitleSection, titleTheme
} from "components/FormComponents/PasswordChangeForm/style.js";
import withErrors from "components/withErrors.jsx"
import {Button, Text} from "kuchkr-react-component-library";
import React, {useCallback, useState} from "react";

const PasswordChangeForm = props => {

    const {onSave, onCancel} = props;

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');

    const onCurrentPasswordChange = useCallback(setCurrentPassword, []);

    const onNewPassword1Change = useCallback(setNewPassword1, []);

    const onNewPassword2Change = useCallback(setNewPassword2, []);

    const onSaveButtonClick = useCallback(() => {
        if (onSave) {
            onSave();
        }
    }, []);

    const onCancelClick = useCallback(() => {
        if (onCancel) {
            onCancel();
        }
    }, []);

    return <StyledPasswordChangeForm>

        <StyledTitleSection>
            <Text theme={titleTheme} text={"Change password:"}/>
        </StyledTitleSection>

        <InputWithError
            theme={inputTheme}
            id={"current_password"}
            title={"current_password"}
            type={'text'}
            value={currentPassword}
            placeholder={"Current password"}
            onChange={onCurrentPasswordChange}/>

        <InputWithError
            theme={inputTheme}
            id={"new_password1"}
            title={"new_password2"}
            type={'text'}
            value={newPassword1}
            placeholder={"New password"}
            onChange={onNewPassword1Change}/>

        <InputWithError
            theme={inputTheme}
            id={"new_password2"}
            title={"new_password2"}
            type={'text'}
            value={newPassword2}
            placeholder={"Confirm new password"}
            onChange={onNewPassword2Change}/>

        <StyledSaveSection>
            <Button theme={cancelButtonTheme} text={'Cancel'} onClick={onCancelClick}/>
            <Button style={{marginLeft: 10}} theme={saveButtonTheme} text={'Save'}
                    onClick={onSaveButtonClick}/>
        </StyledSaveSection>
    </StyledPasswordChangeForm>;
};

export default PasswordChangeForm;