import { ReactElement, useCallback, useEffect, useMemo } from 'react';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import * as dialogs from './dialogs';

import { ButtonWithIcon } from '@/components/chakra/ButtonWithIcon/ButtonWithIcon';
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
    ChangeAvatarDialog: dialogs.ChangeAvatarDialog,
    ChangePropertyDialog: dialogs.ChangePropertyDialog,
    ServiceUnavailableDialog: dialogs.ServiceUnavailableDialog,
    PasswordCreationRequiredDialog: dialogs.PasswordCreationRequiredDialog,
    VerifyAccountDialog: dialogs.VerifyAccountDialog
};

const Dialogs = () => {
    const dialogState = useSelector<RootState, DialogSliceState>((state: RootState) => state.dialog);

    const isOpened = dialogState.opened;
    const componentName = dialogState.component;
    const componentProps = dialogState.componentProps;

    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (componentProps?.dialog && isOpened && event.key === 'Escape') {
            handleCancel();
        }
    }, [componentProps, isOpened]);

    const handleCancel = useCallback(() => {
        if (componentProps.dialog.onCancel) {
            componentProps.dialog.onCancel();
        }
        else {
            dispatch(closeDialog());
        }
    }, [componentProps]);

    const handleBack = useCallback(() => {
        if (componentProps.dialog.onBack) {
            componentProps.dialog.onBack();
        }
    }, [componentProps]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown, false);

        return () => {
            document.removeEventListener('keydown', handleKeyDown, false);
        };
    }, [componentProps]);

    const renderDescription = useMemo(() => {
        if (isOpened && componentProps.dialog?.description) {
            return <div className={'max-w-[400px] text-sm'}>
                {t(componentProps.dialog.description)}
            </div>;
        }
    }, [componentProps, isOpened, t]);

    const onClick = useCallback((e: any) => {
        if (!componentProps?.dialog?.closeable) {
            return;
        }

        if (e.target.classList.contains('dialogScene')) {
            handleCancel();
        }
    }, [componentProps, isOpened]);

    const renderArrowBack = useMemo(() => {
        const arrowBack = componentProps?.dialog?.arrowBack;

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

    }, [componentProps]);

    const renderTitle = useMemo(() => {
        const title = componentProps?.dialog?.title;
        const icon = componentProps?.dialog?.icon;

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

    const dialog = useMemo(() => {
        if (!componentName) {
            return null;
        }

        const Component = componentMap[componentName];

        return <div className={'flex flex-col gap-[20px] rounded-md bg-[#2f2f2f]'}>
            <div className={'flex w-full flex-col gap-[20px] p-[20px] pb-0'}>
                <div className={'flex w-full gap-[20px]'}>
                    {renderArrowBack}
                    {renderTitle}
                </div>
                {componentProps?.dialog?.description && <div className={'flex'}>
                    {renderDescription}
                </div>}
            </div>
            <div className={'flex p-[20px] pt-0'}>
                <Component dispatch={dispatch} t={t} {...componentProps} />
            </div>
        </div>;
    }, [componentProps, t]);

    if (!componentName) {
        return null;
    }

    if (!(componentName in componentMap)) {
        console.error(`No ${componentName} in dialogs map!`);
        return null;
    }

    return <div
        className={'dialogScene absolute left-0 top-0 z-[1] box-border flex h-full w-full items-center justify-center bg-[rgba(30,30,30,0.8)] backdrop-blur-[5px]'}
        onMouseDown={onClick}>
        {dialog}
    </div>;
};

export default Dialogs;
