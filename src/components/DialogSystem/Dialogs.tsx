import React, {useCallback, useEffect, useMemo} from 'react';

import {chakra, Circle, Flex, HStack, Text, VStack} from '@chakra-ui/react';
import {XMarkIcon} from '@heroicons/react/24/outline';
import {ButtonWithIcon} from 'components/chakra/ButtonWithIcon/ButtonWithIcon';
import {dialogAnimation, dialogBgAnimation} from 'components/Forms/animation';
import {isValidMotionProp, motion} from 'framer-motion';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {closeDialog} from 'state/reducers/dialog/dialogSlice';
import {DialogSliceState} from 'state/reducers/dialog/dialogSlice.types';
import {RootState, useAppDispatch} from 'state/store';

import * as dialogs from './dialogs';

const MotionFlex = motion(Flex);

interface IDialogComponentMap {
    [componentKey: string]: (props: any) => JSX.Element;
}

const componentMap: IDialogComponentMap = {
    RegistrationCompleteDialog: dialogs.RegistrationCompleteDialog,
    DeleteAccountDialog: dialogs.DeleteAccountDialog,
    VerificationEmailSentDialog: dialogs.VerificationEmailSentDialog,
    VerifyAccountDialog: dialogs.VerifyAccountDialog,
    ChangeAvatarDialog: dialogs.ChangeAvatarDialog,
    SentPasswordResetMailDialog: dialogs.SentPasswordResetMailDialog,
    ChangePropertyDialog: dialogs.ChangePropertyDialog,
    ServiceUnavailableDialog: dialogs.ServiceUnavailableDialog,
    PasswordCreationRequiredDialog: dialogs.PasswordCreationRequiredDialog
};

const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => {
        return isValidMotionProp(prop)
            || prop === 'children' || prop === 'onMouseDown' || prop === 'onKeyDown';
    },
});

const Dialogs = () => {
    const dialogState = useSelector<RootState, DialogSliceState>((state: RootState) => state.dialog);

    const isOpened = dialogState.opened;
    const componentName = dialogState.component;
    const componentProps = dialogState.componentProps;

    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const handleKeyDown = useCallback((event) => {
        if (componentProps?.dialog && isOpened && event.keyCode === 27) {
            // escape
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

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown, false);

        return () => {
            document.removeEventListener('keydown', handleKeyDown, false);
        };
    }, [componentProps]);

    const renderDescription = useMemo(() => {
        if (isOpened && componentProps.dialog?.description) {
            return <Text maxW={'400px'} fontSize={'sm'}>{t(componentProps.dialog.description)}</Text>;
        }
    }, [componentProps, isOpened, t]);

    const onClick = useCallback((e) => {
        if (!componentProps?.dialog?.closeable) {
            return;
        }

        if (e.target.classList.contains('dialogScene')) {
            handleCancel();
        }
    }, [componentProps, isOpened]);

    const renderTitle = useMemo(() => {
        const title = componentProps?.dialog?.title;
        const icon = componentProps?.dialog?.icon;

        return <HStack spacing={'10px'} justifyContent={'flex-start'} align={'center'}>
            {icon ?
                <Circle bg={icon.backgroundColor} size={'40px'}>
                    <icon.component width={20} height={20} color={icon.color}/>
                </Circle> : null}
            <Text flexGrow={1} fontSize={'md'} fontWeight={'bold'}>{t(title)}</Text>
            <ButtonWithIcon title={'Close'}
                            width={'40px'}
                            height={'40px'}
                            bg={'none'}
                            _hover={{ bg: 'none' }}
                            _active={{ bg: 'none' }}
                            _focus={{ bg: 'none' }}
                            padding={0}
                            iconSize={30}
                            iconColor={'rgba(255,255,255,0.48)'}
                            iconColorHover={'white'}
                            IconComponent={XMarkIcon}
                            onClick={handleCancel}/>
        </HStack>;
    }, [componentProps, t]);

    const dialog = useMemo(() => {
        if (!componentName) {
            return null;
        }

        const Component = componentMap[componentName];

        return <MotionFlex direction={'column'}
                           key={componentName}
                           bg={'#2f2f2f'}
                           borderRadius={'md'}
                           {...componentProps.dialog.flexProps}
                           {...dialogAnimation}>
            <VStack p={3} align={'stretch'} spacing={5}>
                {renderTitle}
                {renderDescription}
            </VStack>
            <Component dispatch={dispatch} t={t} {...componentProps} />
        </MotionFlex>;
    }, [componentProps, t]);

    if (!componentName) {
        return null;
    }

    if (!(componentName in componentMap)) {
        console.error(`No ${componentName} in dialogs map!`);
        return null;
    }

    return <ChakraBox
        className={'dialogScene'}
        onKeyDown={handleKeyDown}
        w={'100%'}
        h={'100%'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        zIndex={1}
        bg={'rgba(30,30,30,0.8)'}
        position={'absolute'}
        top={0}
        left={0}
        boxSizing={'border-box'}
        onMouseDown={onClick}{...dialogBgAnimation}>
        {dialog}
    </ChakraBox>;
};

export default Dialogs;
