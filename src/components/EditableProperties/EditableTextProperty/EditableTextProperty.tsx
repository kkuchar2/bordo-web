import React, {useCallback, useState} from "react";

import {InputWithError} from "components/InputWithError/InputWithError";
import {Button, Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";

import {
    editButtonTheme,
    editInputTheme,
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

    const {name, value, type} = props;

    const [edit, setEdit] = useState(false);

    const {t} = useTranslation();

    const onPropertyChange = useCallback((value) => {

    }, []);

    const renderProperty = useCallback(() => {
        if (edit) {
            return <InputWithError
                theme={editInputTheme}
                style={{width: '100%', marginTop: 0}}
                id={name}
                title={''}
                type={'text'}
                value={value}
                placeholder={"New: " + name}
                onChange={onPropertyChange}/>;
        }
        return <Text theme={propertyValueTheme} text={value}/>;
    }, [edit]);

    const onEditButtonClick = useCallback(() => {
        if (edit) {
            onFormSaved();
            setEdit(false);
        } else {
            setEdit(true);
        }
    }, [edit]);

    const onFormSaved = useCallback(() => {

    }, []);

    return <StyledEditableTextProperty>
        <StyledPropertyValues>
            <Text style={{fontWeight: 'bold'}} theme={propertyNameTheme} text={name}/>
            <PropertyValueSection>
                {renderProperty()}
                <PropertyEditSection>
                    <Button theme={editButtonTheme} text={t(edit ? 'SAVE' : 'CHANGE')} onClick={onEditButtonClick}/>
                </PropertyEditSection>
            </PropertyValueSection>
        </StyledPropertyValues>
    </StyledEditableTextProperty>;
};

export default EditableTextProperty;