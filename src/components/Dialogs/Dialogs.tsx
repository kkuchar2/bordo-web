import React, {useCallback, useEffect} from "react";

import {closeDialog, selectorDialogs} from "appRedux/reducers/application";
import {useAppDispatch} from "appRedux/store";
import {ChangeAvatarDialog} from "components/Dialogs/ChangeAvatarDialog/ChangeAvatarDialog";
import {ChangeEmailDialog} from "components/Dialogs/ChangeEmailDialog/ChangeEmailDialog";
import {ChangePasswordDialog} from "components/Dialogs/ChangePasswordDialog/ChangePasswordDialog";
import {ChangeTextPropertyDialog} from "components/Dialogs/ChangeTextPropertyDialog/ChangeTextPropertyDialog";
import {
    descriptionTextTheme, StyledDialogBottomSection, StyledDialogCloseButton,
    StyledDialogDescriptionSection,
    StyledDialogTitleSection, StyledDialogTopSection,
    titleTextTheme
} from "components/Dialogs/commonStyles";
import {ConfirmationDialog} from "components/Dialogs/ConfirmationDialog/ConfirmationDialog";
import CreateNewModelItemDialog from "components/Dialogs/CreateNewModelItemDialog/CreateNewModelItemDialog";
import {DisableAccountDialog} from "components/Dialogs/DisableAccountDialog/DisableAccountDialog";
import {RegistrationCompleteDialog} from "components/Dialogs/RegistrationCompleteDialog/RegistrationCompleteDialog";
import {SendConfirmationMailDialog} from "components/Dialogs/SendConfirmationEmailDialog/SendConfirmationMailDialog";
import {VerificationEmailSentDialog} from "components/Dialogs/VerificationEmailSentDialog/VerificationEmailSentDialog";
import {Text} from "kuchkr-react-component-library";
import {useSelector} from "react-redux";

import { ChangeUsernameDialog } from "./ChangeUsernameDialog/ChangeUsernameDialog";
import {DeleteAccountDialog} from "./DeleteAccountDialog/DeleteAccountDialog";
import {SentPasswordResetMailDialog} from "./SentPasswordResetMailDialog/SentPasswordResetMailDialog";
import {StyledDialog, StyledDialogs} from "./style";

interface IDialogComponentMap {
    [componentKey: string]: (props: any) => JSX.Element
}

const componentMap: IDialogComponentMap = {
    'DeleteAccountDialog': DeleteAccountDialog,
    'DisableAccountDialog': DisableAccountDialog,
    'ConfirmationDialog': ConfirmationDialog,
    'CreateNewModelItemDialog': CreateNewModelItemDialog,
    'RegistrationCompleteDialog': RegistrationCompleteDialog,
    'VerificationEmailSentDialog': VerificationEmailSentDialog,
    'ChangeAvatarDialog': ChangeAvatarDialog,
    'ChangeEmailDialog': ChangeEmailDialog,
    'SendConfirmationMailDialog': SendConfirmationMailDialog,
    'ChangeUsernameDialog': ChangeUsernameDialog,
    'ChangePasswordDialog': ChangePasswordDialog,
    'SentPasswordResetMailDialog': SentPasswordResetMailDialog,
    'ChangeTextPropertyDialog': ChangeTextPropertyDialog
};

const Dialogs = () => {

    const dialogState = useSelector(selectorDialogs);

    const isOpened = dialogState.opened;
    const componentName = dialogState.component;
    const componentProps = dialogState.componentProps;

    const dispatch = useAppDispatch();

    const handleKeyDown = useCallback((event) => {
        if (componentProps?.dialog && isOpened && event.keyCode === 27) { // escape
            handleCancel();
        }
    }, [componentProps, isOpened]);

    const handleCancel = useCallback(() => {
        if (componentProps.dialog.onCancel) {
            componentProps.dialog.onCancel();
        }
        else {
            dispatch(closeDialog());
        }
    }, [componentProps]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown, false);

        return () => {
            document.removeEventListener("keydown", handleKeyDown, false);
        };
    }, [componentProps]);

    const renderDescription = useCallback(() => {
        if (isOpened && componentProps.dialog?.description) {
            return <StyledDialogDescriptionSection>
                <Text theme={descriptionTextTheme} text={componentProps.dialog.description}/>
            </StyledDialogDescriptionSection>;
        }
    }, [componentProps, isOpened]);

    const onClick = useCallback((e) => {

        const id = e.target.id;

        if (id && id === 'dialogWrapper' && componentProps?.dialog && isOpened) {
            handleCancel();
        }
    }, [componentProps, isOpened]);

    if (!componentName) {
        return null;
    }

    if (!(componentName in componentMap)) {
        console.error(`No ${componentName} in dialogs map!`);
        return null;
    }

    const Component = componentMap[componentName];

    return <StyledDialogs id={"dialogWrapper"} onKeyDown={handleKeyDown} onMouseDown={onClick}>
        <StyledDialog>
            <StyledDialogTopSection>
                <StyledDialogCloseButton onClick={handleCancel}/>
                <StyledDialogTitleSection>
                    <Text theme={titleTextTheme} text={componentProps.dialog.title}/>
                </StyledDialogTitleSection>
                {renderDescription()}
            </StyledDialogTopSection>
            <StyledDialogBottomSection>
                <Component {...componentProps} />
            </StyledDialogBottomSection>
        </StyledDialog>
    </StyledDialogs>;
};

export default Dialogs;