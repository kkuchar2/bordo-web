import React, {useCallback, useEffect, useMemo} from 'react';

import {closeDialog, selectorDialogs} from 'appRedux/reducers/application';
import {useAppDispatch} from 'appRedux/store';
import {dialogAnimation, dialogBgAnimation} from 'components/Forms/animation';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {StyledDialogCloseButton, StyledDialogTopSection} from './commonStyles';
import * as dialogs from './dialogs';
import {StyledDialog, StyledDialogs} from './style';

interface IDialogComponentMap {
    [componentKey: string]: (props: any) => JSX.Element;
}

const componentMap: IDialogComponentMap = {
    RegistrationCompleteDialog: dialogs.RegistrationCompleteDialog,
    DeleteAccountDialog: dialogs.DeleteAccountDialog,
    CreateNewModelItemDialog: dialogs.CreateNewModelItemDialog,
    VerificationEmailSentDialog: dialogs.VerificationEmailSentDialog,
    ChangeAvatarDialog: dialogs.ChangeAvatarDialog,
    SentPasswordResetMailDialog: dialogs.SentPasswordResetMailDialog,
    ChangePropertyDialog: dialogs.ChangePropertyDialog,
    PasswordCreationRequiredDialog: dialogs.PasswordCreationRequiredDialog
};

const Dialogs = () => {
    const dialogState = useSelector(selectorDialogs);

    const isOpened = dialogState.opened;
    const componentName = dialogState.component;
    const componentProps = dialogState.componentProps;

    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const handleKeyDown = useCallback(
        (event) => {
            if (componentProps?.dialog && isOpened && event.keyCode === 27) {
                // escape
                handleCancel();
            }
        },
        [componentProps, isOpened]
    );

    const handleCancel = useCallback(() => {
        if (componentProps.dialog.onCancel) {
            componentProps.dialog.onCancel();
        }
        else {
            dispatch(closeDialog());
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
            return <div className="my-[30px] text-[15px] text-slate-50">{t(componentProps.dialog.description)}</div>;
        }
    }, [componentProps, isOpened, t]);

    const onClick = useCallback(
        (e) => {
            const id = e.target.id;

            if (!componentProps?.dialog?.closeable) {
                return;
            }

            if (id && id === 'dialogWrapper' && componentProps?.dialog && isOpened) {
                handleCancel();
            }
        },
        [componentProps, isOpened]
    );

    const renderCloseButton = useMemo(() => {
        return componentProps?.dialog?.closeable ? <StyledDialogCloseButton onClick={handleCancel}/> : null;
    }, [componentProps, handleCancel]);

    const renderTitle = useMemo(() => {
        const title = componentProps?.dialog?.title;
        const icon = componentProps?.dialog?.icon;

        if (!icon) {
            return <div className="text-[20px] font-bold text-white">{t(title)}</div>;
        }

        return <div className={'flex items-center space-x-2'}>
            <div className={`flex h-[40px] w-[40px] items-center justify-center ${icon.backgroundColor} rounded-full`}>
                <icon.component className={`h-5 w-5 ${icon.color}`}/>
            </div>
            <div className="text-[20px] font-bold text-white">{t(title)}</div>
        </div>;
    }, [componentProps, t]);

    if (!componentName) {
        return null;
    }

    if (!(componentName in componentMap)) {
        console.error(`No ${componentName} in dialogs map!`);
        return null;
    }

    const Component = componentMap[componentName];

    return <StyledDialogs id={'dialogWrapper'} onKeyDown={handleKeyDown} onMouseDown={onClick} {...dialogBgAnimation}>
        <StyledDialog width={componentProps.dialog.width} {...dialogAnimation}>
            <StyledDialogTopSection>
                {renderCloseButton}
                {renderTitle}
                {renderDescription}
            </StyledDialogTopSection>
            <Component {...componentProps} />
        </StyledDialog>
    </StyledDialogs>;
};

export default Dialogs;
