import React, {useCallback, useMemo} from 'react';

import {Button, Flex, Text} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';

import {IconProps} from '../../icon/icon.types';

export interface EditablePropertyProps {
    id: string;
    name: string;
    value: string;
    type?: string;
    icon?: IconProps;
    editText?: string;
    canEdit?: boolean;
    hideTitle?: boolean;
    passwordRequired: boolean;
    uppercaseTitle?: boolean;
    showDialogFunc?: (args: OpenReadyDialogArgs) => void
}

const EditableProperty = (props: EditablePropertyProps) => {
    const { name, value, showDialogFunc, canEdit, editText, hideTitle, icon, passwordRequired } = props;

    const { t } = useTranslation();

    const onEditButtonClick = useCallback(() => {
        showDialogFunc({
            passwordRequired: passwordRequired,
            initialData: {},
        });
    }, [passwordRequired]);

    const renderEdit = useMemo(() => {
        if (!canEdit) {
            return null;
        }

        if (!value) {
            return <Button onClick={onEditButtonClick}>
                {icon ? <icon.component className={`mr-3 block h-6 w-6  ${icon.color}`}/> : null}
                <Text fontSize={'13px'}>{t(editText)}</Text>
            </Button>;
        }

        return <Flex justifySelf={'flex-end'} justify={'flex-end'}>
            <Button onClick={onEditButtonClick} minWidth={'100px'}>
                <Text fontSize={'12px'}>{t(editText)}</Text>
            </Button>
        </Flex>;
    }, [canEdit, onEditButtonClick, value, editText, icon]);

    if (hideTitle) {
        return renderEdit;
    }

    return <Flex direction={'column'} width={'100%'} p={2}>
        <Flex width={'100%'}>
            <Flex flexGrow={1} gap={2} direction={'column'} align={'flex-start'} justify={'center'}>
                <Text fontSize={'13px'}
                      fontWeight={'semibold'}
                      color={'rgba(255,255,255,0.7)'}
                      textTransform={props.uppercaseTitle ? 'uppercase' : 'none'}>
                    {`${name}:`}
                </Text>
                <Text fontSize={'14px'} fontWeight={'normal'}>{value}</Text>
            </Flex>
            <Flex align={'center'} justify={'center'}>
                {renderEdit}
            </Flex>
        </Flex>
    </Flex>;
};

EditableProperty.defaultProps = {
    editText: 'EDIT',
    uppercaseTitle: true
};

export default EditableProperty;
