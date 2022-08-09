import React from 'react';

import {Text} from '@chakra-ui/react';

import {FieldSerializerProps} from './fieldSerializer.types';

export const AutoFieldSerializer = (props: FieldSerializerProps) => {
    const { value } = props;
    return <Text>{value}</Text>;
};

export default AutoFieldSerializer;