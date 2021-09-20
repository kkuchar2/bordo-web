import React from "react";

import {BaseDialogProps} from "components/Dialogs/types";
import {Button, Text} from "kuchkr-react-component-library";

import {
    goHomeButtonTheme,
    descriptionTextTheme,
    StyledRegistrationCompleteDialog,
    StyledDialogButtonsSection,
    StyledDialogDescriptionSection,
    StyledDialogTitleSection,
    titleTextTheme
} from "./style";

export interface RegistrationCompleteDialogProps extends BaseDialogProps {
    title: string,
    description: string,
    onGoHome: (e: Event) => void
}

export const RegistrationCompleteDialog = (props: RegistrationCompleteDialogProps) => {

    const {title, description, onGoHome} = props;

    return <StyledRegistrationCompleteDialog>
        <StyledDialogTitleSection>
            <Text theme={titleTextTheme} text={title}/>
        </StyledDialogTitleSection>

        <StyledDialogDescriptionSection>
            <img style={{marginBottom: 50}} src={"https://c.tenor.com/lBPGdhDqxJcAAAAC/keanu-reeves-whoa.gif"} width={400} />
            <Text theme={descriptionTextTheme} text={description}/>
        </StyledDialogDescriptionSection>

        <StyledDialogButtonsSection>
            <Button theme={goHomeButtonTheme} text={"Sign in"} onClick={onGoHome}/>
        </StyledDialogButtonsSection>
    </StyledRegistrationCompleteDialog>;
};