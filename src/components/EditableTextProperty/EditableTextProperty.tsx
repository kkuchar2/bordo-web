import React, {useCallback, useState} from "react";

import {saveButtonTheme} from "components/FormComponents/PasswordChangeForm/style";
import withErrors from "components/withErrors";
import {Button, Input, Text} from "kuchkr-react-component-library";

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

const InputWithError = withErrors(Input);

export interface EditableTextPropertyProps {
    name: string,
    value: string,
    type?: string,
    editText?: string
}

const EditableTextProperty = (props: EditableTextPropertyProps) => {

    const {name, value, type, editText = 'Edit'} = props;

    const [edit, setEdit] = useState(false);

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
                initialValue={value}
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

    const getEditText = useCallback(() => {
        if (edit) {
            return 'Save';
        }
        return 'Edit';

    }, [edit]);

    return <StyledEditableTextProperty>
        <StyledPropertyValues>
            <Text style={{fontWeight: 'bold'}} theme={propertyNameTheme} text={name}/>
            <PropertyValueSection>
                {renderProperty()}
                <PropertyEditSection>
                    <Button theme={edit ? saveButtonTheme : editButtonTheme} text={getEditText()}
                            onClick={onEditButtonClick}/>
                </PropertyEditSection>
            </PropertyValueSection>
        </StyledPropertyValues>
    </StyledEditableTextProperty>;
};

export default EditableTextProperty;