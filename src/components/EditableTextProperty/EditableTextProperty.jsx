import InputWithError from "components/InputWithError.jsx";
import {Button, Text} from "kuchkr-react-component-library";
import React, {useCallback, useState} from "react";
import {
    editButtonTheme,
    PropertyEditSection,
    propertyNameTheme,
    PropertyValueSection,
    propertyValueTheme,
    StyledEditableTextProperty,
    StyledPropertyValues,
    editInputTheme, saveButtonTheme
} from "./style.js";

const EditableTextProperty = props => {

    const {name, value, type, editText = 'Edit'} = props;

    const [edit, setEdit] = useState(false);

    const onPropertyChange = useCallback((value) => {

    }, []);

    const renderProperty = useCallback(() => {
        if (edit) {
            return <InputWithError theme={editInputTheme} style={{width: '100%', marginTop: 0}} id={name} title={name} type={'text'}
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
        }
        else {
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
                    <Button style={{marginLeft: 20}} theme={edit ? saveButtonTheme : editButtonTheme} text={getEditText()}
                            onClick={onEditButtonClick}/>
                </PropertyEditSection>
            </PropertyValueSection>
        </StyledPropertyValues>
    </StyledEditableTextProperty>;
};

export default EditableTextProperty;