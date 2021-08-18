import {
    cancelButtonTheme,
    confirmButtonTheme,
    descriptionTextTheme,
    StyledConfirmationDialog,
    StyledDialogButtonsSection,
    StyledDialogDescriptionSection,
    StyledDialogTitleSection,
    titleTextTheme
} from "components/Dialogs/ConfirmationDialog/style.js";
import {animatedWindowProps} from "components/FormComponents/animation.js";
import {Button, Text} from "kuchkr-react-component-library";
import React from "react";

const ConfirmationDialog = (props) => {

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

export default ConfirmationDialog;