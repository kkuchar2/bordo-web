import {humanize} from "util/util";

import React, {useCallback, useState} from "react";

import {closeDialog} from "appRedux/reducers/application";
import {DialogProps} from "appRedux/reducers/application/dialogSlice.types";
import {addRow} from "appRedux/services/modelService";
import {useAppDispatch} from "appRedux/store";
import {Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";

import {
    CreateNewModelCustomDescription,
    StyledCreateNewModelItemDialog,
    StyledDialogContentSection,
    StyledModelDescription,
    titleModelTextTheme,
    titleModelValueTextTheme
} from "./style";

export interface CreateNewModelItemDialogData {
    modelPackage: string,
    modelName: string,
    fields: any
}

export const CreateNewModelItemDialog = (props: DialogProps<CreateNewModelItemDialogData>): JSX.Element => {

    const { t } = useTranslation();

    const { modelPackage, modelName, fields } = props.data;

    console.log(props);

    const [formData, setFormData] = useState({});

    const dispatch = useAppDispatch();

    const onFieldChange = useCallback((fieldName: string, value: any) => {
        setFormData(formData => ({ ...formData, [fieldName]: value }));
    }, [formData]);

    const renderFields = useCallback(() => {
        const size = fields.length;

        const formRows = [];

        for (let i = 0; i < size; i++) {
            const fieldInfo = fields[i];
            const name = humanize(fieldInfo.name);
            if (fieldInfo.isEditable) {

            }
        }

        return formRows;
    }, [fields]);

    const onCancel = useCallback(() => {
        dispatch(closeDialog());
    }, []);

    const onConfirm = useCallback(() => {
        // TODO: do not close immediately, only if the form is valid and item was added to DB\
        dispatch(addRow({ modelPackage: modelPackage, model: modelName, itemData: formData }));
        dispatch(closeDialog());
    }, [formData, modelName, modelPackage]);

    return <StyledCreateNewModelItemDialog>
        <CreateNewModelCustomDescription>
            <StyledModelDescription>
                <Text theme={titleModelTextTheme} text={'Model:'}/>
                <Text theme={titleModelValueTextTheme} text={modelName}/>
            </StyledModelDescription>
        </CreateNewModelCustomDescription>

        <StyledDialogContentSection>
            {renderFields()}
        </StyledDialogContentSection>

        <div className={'w-full flex justify-end'}>
            <button type={'button'} className={'cancelButton'} onClick={onCancel}
                    disabled={false}>{t('CANCEL')}</button>
            <button type={'button'} className={'confirmButton'} onClick={onConfirm}
                    disabled={false}>{t('CONFIRM')}</button>
        </div>
    </StyledCreateNewModelItemDialog>;
};