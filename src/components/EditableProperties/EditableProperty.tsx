import React, {useCallback, useMemo} from 'react';

import {ReadyDialogArgs} from 'components/DialogSystem/readyDialogs.types';
import {useTranslation} from 'react-i18next';

import {IconProps} from "../../icon/icon.types";

export interface EditablePropertyProps {
    id: string;
    name: string;
    value: string;
    type?: string;
    icon?: IconProps;
    editText?: string;
    canEdit?: boolean;
    passwordRequired: boolean;
    showDialogFunc: (args: ReadyDialogArgs) => void
}

const EditableProperty = (props: EditablePropertyProps) => {
    const { name, value, showDialogFunc, canEdit, editText, icon } = props;

    const { t } = useTranslation();

    const onEditButtonClick = useCallback(() => {
        showDialogFunc({});
    }, []);

    const renderEdit = useMemo(() => {
        if (!canEdit) {
            return null;
        }

        if (!value) {
            return <button type="button" onClick={onEditButtonClick} className={'fullEditButton'}>
                {icon ? <icon.component className={`mr-3 block h-6 w-6  ${icon.color}`}/> : null}
                {t(editText)}
            </button>;
        }

        return <div className={'flex justify-end items-center w-full flex-grow'}>
            <button type="button" onClick={onEditButtonClick} className={'editButton'}>
                {t(editText)}
            </button>
        </div>;
    }, [canEdit, onEditButtonClick, value, editText, icon]);

    return useMemo(() => {
        if (!value) {
            return <div className={'flex items-center justify-start box-border'}>
                {renderEdit}
            </div>;
        }
        return <div className={'flex flex-row'}>
            <div className={'flex flex-col w-full'}>
                <div className={'property-title'}>{`${name.toUpperCase()}:`}</div>
                <div className={'w-full flex items-center justify-start h-[50px] box-border'}>
                    <div className={'flex flex-row'}>
                        <div className={'property-value'}>{value}</div>
                    </div>
                    {renderEdit}
                </div>
            </div>
        </div>;
    }, [name, value]);
};

EditableProperty.defaultProps = {
    editText: 'EDIT',
};

export default EditableProperty;
