import React, {useCallback, useMemo} from 'react';

import {getUserState} from 'appRedux/reducers/api/auth/accountSlice';
import {ReadyDialogArgs} from 'components/DialogSystem/readyDialogs.types';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {PropertyEditSection, PropertyValueSection, StyledEditableTextProperty, StyledPropertyValues} from './style';

export interface EditablePropertyProps {
    id: string;
    name: string;
    value: string;
    type?: string;
    editText?: string;
    obfuscate: boolean;
    canEdit?: boolean;
    passwordRequired: boolean;
    showDialogFunc: (args: ReadyDialogArgs) => (isOnlySocial: boolean) => void;
}

const EditableProperty = (props: EditablePropertyProps) => {
    const { name, value, showDialogFunc, canEdit } = props;

    const { t } = useTranslation();

    const userState = useSelector(getUserState);

    const isOnlySocial = userState.social.only_social;

    const onEditButtonClick = useCallback(() => {
        showDialogFunc({})(isOnlySocial);
    }, [isOnlySocial]);

    const renderEdit = useMemo(() => {
        if (!canEdit) {
            return null;
        }
        return <PropertyEditSection>
            <button type="button" onClick={onEditButtonClick} className={'editButton'}>
                {t('EDIT')}
            </button>
        </PropertyEditSection>;
    }, [canEdit, onEditButtonClick]);

    return <StyledEditableTextProperty>
        <StyledPropertyValues>
            <div className={'property-title'}>{`${name.toUpperCase()}:`}</div>
            <PropertyValueSection>
                <div className={'flex flex-row'}>
                    <div className={'property-value'}>{value}</div>
                </div>
                {renderEdit}
            </PropertyValueSection>
        </StyledPropertyValues>
    </StyledEditableTextProperty>;
};

export default EditableProperty;
