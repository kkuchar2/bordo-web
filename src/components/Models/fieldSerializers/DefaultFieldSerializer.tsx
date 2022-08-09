import React from 'react';

import {Text} from '@chakra-ui/react';

import {FieldSerializerProps} from './fieldSerializer.types';

export const DefaultFieldSerializer = (props: FieldSerializerProps) => {

    const { name, value, inEditMode, onChange } = props;

    return <Text>{value}</Text>;
};

export default DefaultFieldSerializer;