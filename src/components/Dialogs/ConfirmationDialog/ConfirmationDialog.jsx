import {
    descriptionTextTheme,
    StyledConfirmationDialog, StyledDialogButtonsSection,
    StyledDialogDescriptionSection,
    StyledDialogTitleSection,
    titleTextTheme
} from "components/Dialogs/ConfirmationDialog/style.js";
import {animatedWindowProps} from "components/FormComponents/animation.js";
import {Button, Text} from "kuchkr-react-component-library";
import React from "react";

const ConfirmationDialog = (props) => {

    const {title, description, onConfirm, onCancel} = props;

    return <StyledConfirmationDialog {...animatedWindowProps}>
        <StyledDialogTitleSection>
            <Text theme={titleTextTheme} text={title}/>
        </StyledDialogTitleSection>

        <StyledDialogDescriptionSection>
            <Text theme={descriptionTextTheme} text={description}/>
        </StyledDialogDescriptionSection>

        <StyledDialogButtonsSection>
            <Button theme={Button.darkTheme} text={"Cancel"} onClick={onCancel}/>
            <Button style={{marginLeft: 10}} theme={Button.darkTheme} text={"Confirm"} onClick={onConfirm}/>
        </StyledDialogButtonsSection>
    </StyledConfirmationDialog>;
};

export default ConfirmationDialog;