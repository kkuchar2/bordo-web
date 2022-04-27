import React, {useCallback, useMemo, useState} from "react";

import {useAppDispatch} from "appRedux/store";
import {ReadyDialogArgs} from "components/Dialogs/readyDialogs.types";
import {Button, Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";

import {
    editButtonTheme,
    PropertyEditSection,
    propertyNameTheme,
    PropertyValueSection,
    propertyValueTheme,
    ReveablePropertySection,
    RevealTextButton,
    StyledEditableTextProperty,
    StyledPropertyValues
} from "./style";

export interface EditableTextPropertyProps {
    name: string,
    value: string,
    type?: string,
    editText?: string;
    obfuscate: boolean,
    showDialogFunc: (args: ReadyDialogArgs) => void;
}

let obfucate = function (email) {
    return email.replace(/(.{2})(.*)(?=@)/,
        function (gp1, gp2, gp3) {
            for (let i = 0; i < gp3.length; i++) {
                gp2 += "*";
            }
            return gp2;
        });
};

const EditableMailProperty = (props: EditableTextPropertyProps) => {

    const { name, value, obfuscate, showDialogFunc} = props;

    const { t } = useTranslation();

    const [revealed, setRevealed] = useState(false);

    const dispatch = useAppDispatch();

    const onEditButtonClick = useCallback(() => {
        showDialogFunc({ dispatch, translation: t });
    }, []);

    const revealText = useMemo(() => {
        return revealed ? "Hide" : "Reveal";
    }, [revealed]);

    const onRevealClick = useCallback(() => {
        setRevealed(!revealed);
    }, [revealed]);

    const shownValue = useMemo(() => {
        return revealed ? value : obfucate(value);
    }, [revealed]);

    const renderObfuscate = useMemo(() => {
        if (!obfuscate) {
            return null;
        }
        return <RevealTextButton onClick={onRevealClick}>{revealText}</RevealTextButton>;
    }, [obfuscate, revealText, onRevealClick]);

    return <StyledEditableTextProperty>
        <StyledPropertyValues>
            <Text theme={propertyNameTheme} text={"EMAIL"}/>
            <PropertyValueSection>
                <ReveablePropertySection>
                    <Text theme={propertyValueTheme} text={shownValue}/>
                    {renderObfuscate}
                </ReveablePropertySection>
                <PropertyEditSection>
                    <Button theme={editButtonTheme} text={t('EDIT')} onClick={onEditButtonClick}/>
                </PropertyEditSection>
            </PropertyValueSection>
        </StyledPropertyValues>
    </StyledEditableTextProperty>;
};

export default EditableMailProperty;