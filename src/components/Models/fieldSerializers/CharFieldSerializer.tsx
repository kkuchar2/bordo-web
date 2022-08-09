import React from 'react';

import {Input, Text} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';

import {FieldSerializerProps} from './fieldSerializer.types';

export const CharFieldSerializer = (props: FieldSerializerProps) => {

    const { name, value, inEditMode, onChange, isEditable } = props;

    const { t } = useTranslation();

    if (inEditMode && isEditable) {
        return <Input value={value} placeholder={`${t('TYPE_IN')} ${name}`} title={''} onChange={onChange}/>;
    }
    return <Text>{value}</Text>;
};

export default CharFieldSerializer;