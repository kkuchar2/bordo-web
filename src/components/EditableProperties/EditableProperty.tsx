import React, { useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { OpenReadyDialogArgs } from '@/components/DialogSystem/readyDialogs';
import { Icon, IconProps } from '@/components/Icons/Icon';

export interface EditablePropertyProps {
    id: string;
    name: string;
    value?: string;
    type?: string;
    icon?: IconProps;
    editText?: string;
    canEdit?: boolean;
    hideTitle?: boolean;
    passwordRequired: boolean;
    uppercaseTitle?: boolean;
    initialValues?: any;
    showDialogFunc?: (args: OpenReadyDialogArgs) => void
}

const EditableProperty = (props: EditablePropertyProps) => {

    const {
        name, value, showDialogFunc, canEdit, icon, initialValues,
        editText = 'EDIT', hideTitle, passwordRequired
    } = props;

    const { t } = useTranslation();

    const onEditButtonClick = useCallback(() => {
        if (!showDialogFunc) {
            return;
        }
        showDialogFunc({
            passwordRequired: passwordRequired,
            initialValues: initialValues,
        });
    }, [passwordRequired]);

    const renderEdit = useMemo(() => {
        if (!canEdit) {
            return null;
        }

        return <div className={'flex justify-end self-end'}>
            <button
                className={'flex items-center justify-center gap-3 rounded-md bg-white/5 py-2 px-4 ' +
                    'text-sm font-medium hover:bg-white/10'}
                onClick={onEditButtonClick}>
                {t(editText)}
                {icon && <Icon {...icon}/>}
            </button>
        </div>;
    }, [canEdit, onEditButtonClick, editText]);

    if (hideTitle) {
        return renderEdit;
    }

    return <div className={'flex w-full flex-col'}>
        <div className={'flex w-full'}>
            <div className={'flex grow flex-col items-start justify-center gap-2'}>
                <div className={'font-semibold text-sm text-white/70 ' + (props.uppercaseTitle ? 'uppercase' : 'none')}>
                    {`${name}:`}
                </div>
                {value && <div>{value}</div>}
            </div>
            <div className={'grid place-items-center'}>
                {renderEdit}
            </div>
        </div>
    </div>;
};

export default EditableProperty;
