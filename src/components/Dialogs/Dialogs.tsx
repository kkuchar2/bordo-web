import React from "react";

import {useMediaQuery} from "@material-ui/core";
import {selectorDialogs} from "appRedux/reducers/application";
import {ConfirmationDialog} from "components/Dialogs/ConfirmationDialog/ConfirmationDialog";
import CreateNewModelItemDialog from "components/Dialogs/CreateNewModelItemDialog/CreateNewModelItemDialog";
import {defaultShowUpAnimation} from "components/FormComponents/animation";
import {useSelector} from "react-redux";

import {StyledDialog, StyledDialogs} from "./style";

interface IDialogComponentMap {
    [componentKey: string]: (props: any) => JSX.Element
}

const componentMap : IDialogComponentMap = {
    'ConfirmationDialog' : ConfirmationDialog,
    'CreateNewModelItemDialog' : CreateNewModelItemDialog,
};

const Dialogs = () => {

    const data = useSelector(selectorDialogs);

    const componentKey = data.component;
    const componentProps = data.componentProps;
    const isMobile = useMediaQuery('(max-width: 1200px)');

    if (!componentKey) {
        return null;
    }

    const Component = componentMap[componentKey];

    const animationProps = isMobile ? null : defaultShowUpAnimation;

    return <StyledDialogs>
        <StyledDialog {...animationProps}>
            <Component {...componentProps} />
        </StyledDialog>
    </StyledDialogs>;
};

export default Dialogs;