import React, {useCallback, useEffect} from "react";

import {selectorDialogs} from "appRedux/reducers/application";
import {ChangeAvatarDialog} from "components/Dialogs/ChangeAvatarDialog/ChangeAvatarDialog";
import {ChangeEmailDialog} from "components/Dialogs/ChangeEmailDialog/ChangeEmailDialog";
import {ChangePasswordDialog} from "components/Dialogs/ChangePasswordDialog/ChangePasswordDialog";
import {
    descriptionTextTheme,
    StyledDialogDescriptionSection,
    StyledDialogTitleSection,
    titleTextTheme
} from "components/Dialogs/commonStyles";
import {ConfirmationDialog} from "components/Dialogs/ConfirmationDialog/ConfirmationDialog";
import CreateNewModelItemDialog from "components/Dialogs/CreateNewModelItemDialog/CreateNewModelItemDialog";
import {RegistrationCompleteDialog} from "components/Dialogs/RegistrationCompleteDialog/RegistrationCompleteDialog";
import {Text} from "kuchkr-react-component-library";
import {useSelector} from "react-redux";

import {DeleteAccountDialog} from "./DeleteAccountDialog/DeleteAccountDialog";
import { SentPasswordResetMailDialog } from "./SentPasswordResetMailDialog/SentPasswordResetMailDialog";
import {StyledDialog, StyledDialogs} from "./style";

interface IDialogComponentMap {
    [componentKey: string]: (props: any) => JSX.Element
}

const componentMap: IDialogComponentMap = {
    'DeleteAccountDialog': DeleteAccountDialog,
    'ConfirmationDialog': ConfirmationDialog,
    'CreateNewModelItemDialog': CreateNewModelItemDialog,
    'RegistrationCompleteDialog': RegistrationCompleteDialog,
    'ChangeAvatarDialog': ChangeAvatarDialog,
    'ChangeEmailDialog': ChangeEmailDialog,
    'ChangePasswordDialog': ChangePasswordDialog,
    'SentPasswordResetMailDialog' : SentPasswordResetMailDialog
};

const Dialogs = () => {

    const data = useSelector(selectorDialogs);
    const componentKey = data.component;
    const componentProps = data.componentProps;

    const handleKeyDown = useCallback((event) => {
        if (event.keyCode === 27) { // escape
            componentProps?.onCancel();
        }
    }, [componentProps]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown, false);

        return () => {
            document.removeEventListener("keydown", handleKeyDown, false);
        };
    }, [componentProps]);

    const renderDescription = useCallback(() => {
        const description = componentProps.description;

        if (!description) {
            return null;
        }

        if (description === '') {
            return null;
        }

        return <StyledDialogDescriptionSection>
            <Text theme={descriptionTextTheme} text={componentProps.description}/>
        </StyledDialogDescriptionSection>;
    }, [componentProps]);

    const onClick = useCallback((e) => {

        const id = e.target.id;

        if (id && id === 'dialogWrapper' && componentProps) {
            const cancelFunc = componentProps.onCancel;

            if (cancelFunc) {
                cancelFunc();
            }
        }
    }, [componentProps]);

    if (!componentKey) {
        return null;
    }

    if (!(componentKey in componentMap)) {
        console.error(`No ${componentKey} in dialogs map!`);
        return null;
    }

    const Component = componentMap[componentKey];

    return <StyledDialogs id={"dialogWrapper"} onKeyDown={handleKeyDown} onMouseDown={onClick}>
        <StyledDialog>
            <StyledDialogTitleSection>
                <Text theme={titleTextTheme} text={componentProps.title}/>
            </StyledDialogTitleSection>
            {renderDescription()}
            <Component {...componentProps} />
        </StyledDialog>
    </StyledDialogs>;
};

export default Dialogs;