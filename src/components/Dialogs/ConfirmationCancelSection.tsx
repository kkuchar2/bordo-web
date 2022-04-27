import React, {useMemo} from "react";

import {Fade} from "@mui/material";
import {closeDialog} from "appRedux/reducers/application";
import {useAppDispatch} from "appRedux/store";
import ThreeDotsLoader from "components/Loaders/ThreeDotsLoader/ThreeDotsLoader";
import {Button} from "kuchkr-react-component-library";
import {TFunction} from "react-i18next";

import {cancelButtonTheme, confirmButtonTheme} from "./commonStyles";
import {StyledButtonPendingOverlay, StyledDialogButtonsSection} from "./style";

export interface ConfirmationCancelSectionProps {
    onConfirm?: (e: Event) => void,
    onCancel: (e: Event) => void,
    translation: TFunction<"translation">,
    confirmDisabled: boolean,
    waiting: boolean,
    customConfirmTextKey?: string,
    hide?: boolean
}

export const ConfirmationCancelSection = (props: ConfirmationCancelSectionProps) => {

    const dispatch = useAppDispatch();

    const {
        onConfirm = () => dispatch(closeDialog()),
        onCancel = () => dispatch(closeDialog()),
        translation, confirmDisabled, waiting, customConfirmTextKey, hide
    } = props;

    const renderConfirmationButton = useMemo(() => {

        if (waiting) {
            return <Button theme={confirmButtonTheme}
                           onClick={onConfirm}
                           disabled={confirmDisabled}>
                <Fade in={waiting} style={{ transitionDelay: waiting ? '800ms' : '0ms', }} unmountOnExit>
                    <StyledButtonPendingOverlay>
                        <ThreeDotsLoader scale={0.5} color={'white'}/>
                    </StyledButtonPendingOverlay>
                </Fade>
            </Button>;
        }

        return <Button theme={confirmButtonTheme}
                       text={translation(customConfirmTextKey ? customConfirmTextKey : 'CONFIRM')}
                       onClick={onConfirm}
                       disabled={confirmDisabled}/>;
    }, [waiting, onConfirm, confirmDisabled, translation]);

    if (hide) {
        return null;
    }

    return <StyledDialogButtonsSection>
        <Button theme={cancelButtonTheme} text={translation('CANCEL')} onClick={onCancel} disabled={false}/>
        {renderConfirmationButton}
    </StyledDialogButtonsSection>;
};