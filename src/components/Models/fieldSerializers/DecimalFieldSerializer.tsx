import React, {useEffect, useState} from 'react';

import {Input, Text} from '@chakra-ui/react';
import {FieldSerializerProps} from 'components/Models/fieldSerializers/fieldSerializer.types';

export const DecimalFieldSerializer = (props: FieldSerializerProps) => {

    const { name, value, inEditMode, onChange, isEditable } = props;

    const [currentValue, setCurrentValue] = useState(value ? value.toString() : '');

    useEffect(() => {
        onChange?.(currentValue.replace(',', '.'));
    }, [currentValue, onChange]);

    if (!inEditMode || !isEditable) {
        return <Text>{value}</Text>;
    }

    return <Input
        placeholder={'e.g. 1.345 or 1,345'}
        value={currentValue}
        title={''}
        onChange={setCurrentValue}/>;
};

export default DecimalFieldSerializer;