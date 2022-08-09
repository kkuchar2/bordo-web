import React from 'react';

import {Input, Text} from '@chakra-ui/react';
import {FieldSerializerProps} from 'components/Models/fieldSerializers/fieldSerializer.types';

export interface IntegerFieldSerializerProps extends FieldSerializerProps {
    inputCustomTheme: object
}

export const IntegerFieldSerializer = (props: IntegerFieldSerializerProps) => {

    const { value, inEditMode, onChange, isEditable, inputCustomTheme } = props;

    if (inEditMode && isEditable) {
        return <Input value={value ? value.toString() : ''} placeholder={'Enter value'} title={''}
                      onChange={onChange}/>;
    }
    return <Text>{value}</Text>;
};

export default IntegerFieldSerializer;