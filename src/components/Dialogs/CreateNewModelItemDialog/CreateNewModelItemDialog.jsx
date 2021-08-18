import {hide_dialog} from "appRedux/reducers/application";
import {FieldRow} from "components/Dialogs/ConfirmationDialog/FieldRow/FieldRow.jsx";
import {getColumnProperties} from "components/Models/columnProperties.js";
import {Button, Text} from "kuchkr-react-component-library";
import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import {
    cancelButtonTheme,
    confirmButtonTheme,
    StyledCreateNewModelItemDialog,
    StyledDialogButtonsSection,
    StyledDialogContentSection,
    StyledDialogTitleSection,
    titleTextTheme
} from "./style.js";

function humanize(str) {
    let i, frags = str.split('_');
    for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
}

const CreateNewModelItemDialog = (props) => {

    const {modelName, fields} = props;

    const dispatch = useDispatch();

    const createFormField = useCallback((type, name, isEditable, idx) => {
        const colProps = getColumnProperties(type);
        return <FieldRow
            name={name}
            title={name + ':'}
            colProps={colProps}
            inEditMode={true}
            key={idx}
            fullWidth={true}
            isEditable={true}/>;
    }, [fields]);

    const renderFields = useCallback(() => {
        const size = fields.length;

        const formRows = [];

        for (let i = 0; i < size; i++) {
            const fieldInfo = fields[i];
            console.log(fieldInfo);
            const name = humanize(fieldInfo.name);
            if (fieldInfo.isEditable) {
                formRows.push(createFormField(fieldInfo.type, name, fieldInfo.isEditable, i));
            }
        }

        return formRows;
    }, [fields]);

    const onCancel = useCallback(() => {
        dispatch(hide_dialog());
    }, []);

    const onConfirm = useCallback(() => {
        // TODO: do not close immediately, only if the form is valid and item was added to DB
        dispatch(hide_dialog());
    }, []);

    return <StyledCreateNewModelItemDialog>
        <StyledDialogTitleSection>
            <Text theme={titleTextTheme} text={'Create new ' + modelName}/>
        </StyledDialogTitleSection>
        <StyledDialogContentSection>
            {renderFields()}
        </StyledDialogContentSection>

        <StyledDialogButtonsSection>
            <Button theme={cancelButtonTheme} text={"Cancel"} onClick={onCancel}/>
            <Button theme={confirmButtonTheme} text={"Create"} onClick={onConfirm}/>
        </StyledDialogButtonsSection>
    </StyledCreateNewModelItemDialog>;
};

export default CreateNewModelItemDialog;