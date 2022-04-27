import React, {useCallback} from "react";

import {useAppDispatch} from "appRedux/store";
import {showChangeNormalPropertyDialog} from "components/Dialogs/readyDialogs";
import {Button, Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";

import {
    editButtonTheme,
    PropertyEditSection,
    propertyNameTheme,
    PropertyValueSection,
    propertyValueTheme,
    StyledEditableTextProperty,
    StyledPropertyValues
} from "./style";

export interface EditableTextPropertyProps {
    name: string,
    value: string,
    type?: string,
    editText?: string
}

const EditableTextProperty = (props: EditableTextPropertyProps) => {

    const { name, value } = props;

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const onEditButtonClick = useCallback(() => {
        showChangeNormalPropertyDialog({ dispatch, translation: t });
    }, []);

    return <StyledEditableTextProperty>
        <StyledPropertyValues>
            <Text theme={propertyNameTheme} text={name}/>
            <PropertyValueSection>
                <Text theme={propertyValueTheme} text={value}/>
                <PropertyEditSection>
                    <Button theme={editButtonTheme} text={t('CHANGE')} onClick={onEditButtonClick}/>
                </PropertyEditSection>
            </PropertyValueSection>
        </StyledPropertyValues>
    </StyledEditableTextProperty>;
};

export default EditableTextProperty;