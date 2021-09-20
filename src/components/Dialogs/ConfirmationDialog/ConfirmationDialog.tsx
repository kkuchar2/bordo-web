import React from "react";

import {BaseDialogProps} from "components/Dialogs/types";
import {Button, Text} from "kuchkr-react-component-library";

import {
    cancelButtonTheme,
    confirmButtonTheme,
    descriptionTextTheme,
    StyledConfirmationDialog,
    StyledDialogButtonsSection,
    StyledDialogDescriptionSection,
    StyledDialogTitleSection,
    titleTextTheme
} from "./style";

export interface ConfirmationDialogProps extends BaseDialogProps {
    title: string,
    description: string,
    onConfirm: (e: Event) => void,
    onCancel: (e: Event) => void
}

export const ConfirmationDialog = (props: ConfirmationDialogProps) => {

    const {title, description, onConfirm, onCancel} = props;

    console.log('Rendering confirmation dialog');

    return <StyledConfirmationDialog>
        <StyledDialogTitleSection>
            <Text theme={titleTextTheme} text={title}/>
        </StyledDialogTitleSection>

        <StyledDialogDescriptionSection>
            <Text theme={descriptionTextTheme} text={description}/>
        </StyledDialogDescriptionSection>

        <StyledDialogButtonsSection>
            <Button theme={cancelButtonTheme} text={"Cancel"} onClick={onCancel}/>
            <Button theme={confirmButtonTheme} text={"Confirm"} onClick={onConfirm}/>
        </StyledDialogButtonsSection>
    </StyledConfirmationDialog>;
};