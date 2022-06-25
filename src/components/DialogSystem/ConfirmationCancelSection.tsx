import React, {useMemo} from "react";

import {closeDialog} from "appRedux/reducers/application";
import {useAppDispatch} from "appRedux/store";
import {Button} from "kuchkr-react-component-library";
import {TFunction} from "react-i18next";

import {cancelButtonTheme, confirmButtonTheme} from "./commonStyles";

export interface ConfirmationCancelSectionProps {
    onConfirm?: (e: Event) => void,
    onCancel: (e: Event) => void,
    translation: TFunction<"translation">,
    confirmDisabled: boolean,
    waiting?: boolean,
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
                           disabled={confirmDisabled} />;
        }

        return <Button theme={confirmButtonTheme}
                       text={translation(customConfirmTextKey ? customConfirmTextKey : 'CONFIRM')}
                       onClick={onConfirm}
                       disabled={confirmDisabled}/>;
    }, [waiting, onConfirm, confirmDisabled, translation]);

    if (hide) {
        return null;
    }

    return <div>
        <Button theme={cancelButtonTheme} text={translation('CANCEL')} onClick={onCancel} disabled={false}/>
        {renderConfirmationButton}
    </div>;
};