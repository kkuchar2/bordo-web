import React, {useCallback, useState} from "react";

import {editButtonTheme} from "components/EditableTextProperty/style";
import PasswordChangeForm from "components/FormComponents/PasswordChangeForm/PasswordChangeForm";
import {Button, Text} from "kuchkr-react-component-library";

import {
    PropertyEditSection,
    propertyNameTheme,
    PropertyValueSection,
    propertyValueTheme,
    StyledEditablePasswordProperty,
    StyledEditedProperty,
    StyledPropertyValues
} from "./style";

export interface EditablePasswordPropertyProps {
    name: string,
    value: any, // TODO
    type?: string,
    editText: string
}

const EditablePasswordProperty = (props: EditablePasswordPropertyProps) => {

    const {name, value, type, editText = 'Edit'} = props;

    const [edit, setEdit] = useState(false);

    const onSave = useCallback(() => {
        setEdit(false);
    }, []);

    const onCancel = useCallback(() => {
        setEdit(false);
    }, []);

    const renderProperty = useCallback(() => {
        if (edit) {
            return <StyledEditedProperty>
                <PasswordChangeForm onSave={onSave} onCancel={onCancel}/>
            </StyledEditedProperty>;
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

    const renderTitle = useCallback(() => {
        if (!edit) {
            return <Text style={{fontWeight: 'bold'}} theme={propertyNameTheme} text={name}/>;
        }
    }, [edit]);

    const renderEditButton = useCallback(() => {
        if (!edit) {
            return <Button style={{marginLeft: 20}} theme={editButtonTheme} text={'Change'}
                           onClick={onEditButtonClick}/>;
        }
    }, [edit]);

    return <StyledEditablePasswordProperty>
        <StyledPropertyValues>
            {renderTitle()}
            <PropertyValueSection>
                {renderProperty()}
                <PropertyEditSection>
                    {renderEditButton()}
                </PropertyEditSection>
            </PropertyValueSection>
        </StyledPropertyValues>
    </StyledEditablePasswordProperty>;
};

export default EditablePasswordProperty;