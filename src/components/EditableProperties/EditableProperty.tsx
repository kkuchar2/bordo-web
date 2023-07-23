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
                className={'flex min-w-[100px] items-center justify-center gap-3 rounded-md bg-neutral-700 p-2 text-sm font-semibold hover:bg-neutral-600'}
                onClick={onEditButtonClick}>
                {icon && <Icon {...icon}/>}
                {t(editText)}
            </button>
        </div>;
    }, [canEdit, onEditButtonClick, editText]);

    if (!value) {
        return null;
    }

    if (hideTitle) {
        return renderEdit;
    }

    return <div className={'flex w-full flex-col p-2'}>
        <div className={'flex w-full'}>
            <div className={'flex grow flex-col items-start justify-center gap-2'}>
                <div className={'font-semibold text-sm text-white/70 ' + (props.uppercaseTitle ? 'uppercase' : 'none')}>
                    {`${name}:`}
                </div>
                <div>{value}</div>
            </div>
            <div className={'grid place-items-center'}>
                {renderEdit}
            </div>
        </div>
    </div>;
};

export default EditableProperty;
