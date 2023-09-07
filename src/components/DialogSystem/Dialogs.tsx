import { ReactElement, useCallback, useEffect, useMemo } from 'react';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import * as dialogs from './dialogs';

import { ButtonWithIcon } from '@/components/ButtonWithIcon/ButtonWithIcon';
import { Icon } from '@/components/Icons/Icon';
import { closeDialog } from '@/state/reducers/dialog/dialogSlice';
import { DialogSliceState } from '@/state/reducers/dialog/dialogSlice.types';
import { RootState, useAppDispatch } from '@/state/store';

interface IDialogComponentMap {
    [componentKey: string]: (props: any) => ReactElement | null;
}

const componentMap: IDialogComponentMap = {
    SentEmailDialog: dialogs.SentEmailDialog,
    DeleteAccountDialog: dialogs.DeleteAccountDialog,
    DisconnectGoogleDialog: dialogs.DisconnectGoogleDialog,
    ChangeAvatarModeDialog: dialogs.ChangeAvatarModeDialog,
    EditImageDialog: dialogs.EditImageDialog,
    SelectGIFDialog: dialogs.SelectGIFDialog,
    ChangePropertyDialog: dialogs.ChangePropertyDialog,
    UpdatePasswordDialog: dialogs.UpdatePasswordDialog,
    ServiceUnavailableDialog: dialogs.ServiceUnavailableDialog,
    VerifyAccountDialog: dialogs.VerifyAccountDialog,
    UpdateEmailDialog: dialogs.UpdateEmailDialog,
};

const Dialogs = () => {
    const dialogState = useSelector<RootState, DialogSliceState>((state: RootState) => state.dialog);

    const { opened, component, componentProps } = dialogState;

    const { dialog } = componentProps;

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (dialog && opened && event.key === 'Escape') {
            handleCancel();
        }
    }, [componentProps, opened]);

    const handleCancel = useCallback(() => {
        if (dialog.onCancel) {
            dialog.onCancel();
        }
        else {
            dispatch(closeDialog());
        }
    }, [componentProps]);

    const handleBack = useCallback(() => {
        if (dialog.onBack) {
            dialog.onBack();
        }
    }, [componentProps]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown, false);

        return () => {
            document.removeEventListener('keydown', handleKeyDown, false);
        };
    }, [componentProps]);

    const renderDescription = useMemo(() => {
        if (opened && componentProps.dialog?.description) {
            return <div className={'max-w-[400px] text-sm'}>
                {t(componentProps.dialog.description)}
            </div>;
        }
    }, [componentProps, opened, t]);

    const onClick = useCallback((e: any) => {
        if (!componentProps?.dialog?.closeable) {
            return;
        }

        if (e.target.classList.contains('dialogScene')) {
            handleCancel();
        }
    }, [componentProps, opened]);

    const renderArrowBack = useMemo(() => {
        const arrowBack = dialog.arrowBack ?? false;

        if (arrowBack) {
            return <ButtonWithIcon title={'Back'}
                className={'h-[40px] w-[40px]'}
                iconColor={'rgba(255,255,255,0.48)'}
                iconColorHover={'white'}
                icon={{
                    component: ArrowLeftIcon,
                    size: 25
                }}
                onClick={handleBack}/>;
        }

    }, [dialog]);

    const renderTitle = useMemo(() => {
        const title = dialog.title;
        const icon = dialog.icon;

        return <div className={'flex grow items-center justify-start gap-[10px]'}>
            {icon &&
                <div className={'grid place-items-center'}>
                    <Icon {...icon}/>
                </div>}
            {title && <div className={'grow font-bold'}>{t(title)}</div>}
            <ButtonWithIcon title={'Close'}
                className={'h-[40px] w-[40px]'}
                iconColor={'rgba(255,255,255,0.48)'}
                iconColorHover={'white'}
                icon={{
                    component: XMarkIcon,
                    size: 25
                }}
                onClick={handleCancel}/>
        </div>;
    }, [componentProps, t]);

    const dialogRender = useMemo(() => {
        if (!component) {
            return null;
        }

        const Component = componentMap[component];

        return <div
            className={'flex w-full translate-y-[-100px] animate-dialog flex-col gap-[20px] rounded-md bg-[#2f2f2f]'}
            style={{
                maxWidth: dialog.maxWidth ?? 'auto',
            }}>
            <div className={'flex w-full flex-col gap-[20px] p-[20px] pb-0'}>
                <div className={'flex w-full gap-[20px]'}>
                    {renderArrowBack}
                    {renderTitle}
                </div>
                {dialog.description && <div className={'flex'}>
                    {renderDescription}
                </div>}
            </div>
            <div className={'w-full p-[20px] pt-0'}>
                <Component t={t} {...componentProps} />
            </div>
        </div>;
    }, [componentProps, t]);

    if (!component) {
        return null;
    }

    if (!(component in componentMap)) {
        console.error(`No ${component} in dialogs map!`);
        return null;
    }

    return <div
        className={'dialogScene absolute left-0 top-0 z-[1] box-border flex h-full w-full items-center justify-center bg-[rgba(30,30,30,0.8)] p-[20px] backdrop-blur-[5px]'}
        onMouseDown={onClick}>
        {dialogRender}
    </div>;
};

export default Dialogs;
