import React, {useCallback} from 'react';

import {Text} from '@chakra-ui/react';

import {FieldSerializerProps} from './fieldSerializer.types';

export const BooleanFieldSerializer = (props: FieldSerializerProps) => {

    const { value, inEditMode, onChange, isEditable } = props;

    const onSelectChange = useCallback((v) => {
        onChange?.(v.value);
    }, []);

    const toUpperFirst = useCallback((str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }, []);

    if (inEditMode && isEditable) {
        return <Text>{'TODO ADD Select'}</Text>;
    }
    return <Text>{value ? 'True' : 'False'}</Text>;
};

export default BooleanFieldSerializer;