import React, {useCallback, useMemo} from 'react';

import {Button, Flex, Text} from '@chakra-ui/react';
import {ReadyDialogArgs} from 'components/DialogSystem/readyDialogs.types';
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
    showDialogFunc: (args: ReadyDialogArgs) => void
}

const EditableProperty = (props: EditablePropertyProps) => {
    const { name, value, showDialogFunc, canEdit, editText, hideTitle, icon } = props;

    const { t } = useTranslation();

    const onEditButtonClick = useCallback(() => {
        showDialogFunc({});
    }, []);

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

    return <Flex width={'100%'} p={2} borderRadius={4}>
        <Flex flexGrow={1} gap={2} direction={'column'} align={'flex-start'} justify={'center'}>
            <Text fontSize={'13px'} fontWeight={'semibold'}
                  color={'rgba(255,255,255,0.7)'}>{`${name.toUpperCase()}:`}</Text>
            <Text fontSize={'14px'} fontWeight={'normal'}>{value}</Text>
        </Flex>
        <Flex align={'center'} justify={'center'}>
            {renderEdit}
        </Flex>
    </Flex>;
};

EditableProperty.defaultProps = {
    editText: 'EDIT',

};

export default EditableProperty;
