import React, {useCallback} from "react";

import {useAppDispatch} from "appRedux/store";
import {showChangePasswordDialog} from "components/Dialogs/readyDialogs";
import {editButtonTheme} from "components/EditableProperties/EditableTextProperty/style";
import {Button, Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";

import {
    PropertyEditSection,
    propertyNameTheme,
    PropertyValueSection,
    propertyValueTheme,
    StyledEditablePasswordProperty,
    StyledPropertyValues
} from "./style";

export interface EditablePasswordPropertyProps {
    name: string,
    value: any,
    type?: string,
}

const EditablePasswordProperty = (props: EditablePasswordPropertyProps) => {

    const {name, value} = props;

    const {t} = useTranslation();

    const dispatch = useAppDispatch();

    const onEditButtonClick = useCallback(() => {
        showChangePasswordDialog(dispatch, t);
    }, []);

    return <StyledEditablePasswordProperty>
        <StyledPropertyValues>
            <Text theme={propertyNameTheme} text={name}/>
            <PropertyValueSection>
                <Text theme={propertyValueTheme} text={value}/>
                <PropertyEditSection>
                    <Button theme={editButtonTheme} text={t('CHANGE')} onClick={onEditButtonClick}/>
                </PropertyEditSection>
            </PropertyValueSection>
        </StyledPropertyValues>
    </StyledEditablePasswordProperty>;
};

export default EditablePasswordProperty;