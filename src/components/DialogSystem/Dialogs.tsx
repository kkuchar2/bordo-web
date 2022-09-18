import React, {useCallback, useEffect, useMemo} from 'react';

import {Box, chakra, Flex, HStack, Stack, Text} from '@chakra-ui/react';
import {XMarkIcon} from '@heroicons/react/24/outline';
import {ArrowLeftIcon} from '@heroicons/react/24/solid';
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
    SentEmailDialog: dialogs.SentEmailDialog,
    DeleteAccountDialog: dialogs.DeleteAccountDialog,
    DisconnectGoogleDialog: dialogs.DisconnectGoogleDialog,
    VerifyAccountDialog: dialogs.VerifyAccountDialog,
    ChangeAvatarDialog: dialogs.ChangeAvatarDialog,
    ChangePropertyDialog: dialogs.ChangePropertyDialog,
    ServiceUnavailableDialog: dialogs.ServiceUnavailableDialog,
    PasswordCreationRequiredDialog: dialogs.PasswordCreationRequiredDialog
};

const ChakraBox = chakra(motion(Box), {
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

    const renderArrowBack = useMemo(() => {
        const arrowBack = componentProps?.dialog?.arrowBack;

        if (arrowBack) {
            return <ButtonWithIcon title={'Back'}
                                   width={'40px'}
                                   height={'40px'}
                                   bg={'rgba(255,255,255,0.09)'}
                                   _hover={{ bg: 'rgba(255,255,255,0.2)' }}
                                   _active={{ bg: 'rgba(255,255,255,0.2)' }}
                                   _focus={{ bg: 'rgba(255,255,255,0.2)' }}
                                   padding={0}
                                   iconSize={25}
                                   iconColor={'rgba(255,255,255,0.48)'}
                                   iconColorHover={'white'}
                                   IconComponent={ArrowLeftIcon}
                                   onClick={handleBack}/>;
        }

    }, [componentProps]);

    const renderTitle = useMemo(() => {
        const title = componentProps?.dialog?.title;
        const icon = componentProps?.dialog?.icon;

        return <HStack spacing={'10px'} justifyContent={'flex-start'} align={'center'} flexGrow={1}>
            {icon &&
                <Flex align={'center'} justify={'center'}{...icon.flexProps}>
                    <icon.component width={icon.size || 20} height={icon.size || 20} color={icon.color}/>
                </Flex>}
            <Text flexGrow={1} fontSize={'md'} fontWeight={'bold'}>{t(title)}</Text>
            <ButtonWithIcon title={'Close'}
                            width={'40px'}
                            height={'40px'}
                            bg={'rgba(255,255,255,0.09)'}
                            _hover={{ bg: 'rgba(255,255,255,0.2)' }}
                            _active={{ bg: 'rgba(255,255,255,0.2)' }}
                            _focus={{ bg: 'rgba(255,255,255,0.2)' }}
                            padding={0}
                            iconSize={25}
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
                           gap={'20px'}
                           borderRadius={'md'}
                           {...componentProps.dialog.flexProps}
                           {...dialogAnimation}>
            <Flex direction={'column'} gap={'20px'} w={'100%'} p={'20px'} pb={0}>
                <Flex w={'100%'} gap={'20px'}>
                    {renderArrowBack}
                    {renderTitle}
                </Flex>
                {componentProps?.dialog?.description && <Flex>
                    {renderDescription}
                </Flex>}
            </Flex>
            <Stack p={'20px'} pt={0}>
                <Component dispatch={dispatch} t={t} {...componentProps} />
            </Stack>
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
        backdropFilter={'blur(5px)'}
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
