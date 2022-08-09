import {humanize} from 'util/util';

import React, {useCallback, useState} from 'react';

import {Button, Text} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {closeDialog} from 'state/reducers/dialog/dialogSlice';
import {DialogProps} from 'state/reducers/dialog/dialogSlice.types';
import {addRow} from 'state/services/modelService';
import {useAppDispatch} from 'state/store';

import {
    CreateNewModelCustomDescription,
    StyledCreateNewModelItemDialog,
    StyledDialogContentSection,
    StyledModelDescription
} from './style';

export interface CreateNewModelItemDialogData {
    modelPackage: string,
    modelName: string,
    fields: any
}

export const CreateNewModelItemDialog = (props: DialogProps<CreateNewModelItemDialogData>): JSX.Element => {

    const { t } = useTranslation();

    const { modelPackage, modelName, fields } = props.data;

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
                <Text>{'Model:'}</Text>
                <Text>{modelName}</Text>
            </StyledModelDescription>
        </CreateNewModelCustomDescription>

        <StyledDialogContentSection>
            {renderFields()}
        </StyledDialogContentSection>

        <div className={'w-full flex justify-end'}>
            <Button type={'button'} className={'cancelButton'} onClick={onCancel}
                    disabled={false}>{t('CANCEL')}</Button>
            <Button type={'button'} className={'confirmButton'} onClick={onConfirm}
                    disabled={false}>{t('CONFIRM')}</Button>
        </div>
    </StyledCreateNewModelItemDialog>;
};