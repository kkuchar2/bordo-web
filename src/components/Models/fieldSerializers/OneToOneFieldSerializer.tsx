import React from 'react';

import {Text} from '@chakra-ui/react';
import {FieldSerializerProps} from 'components/Models/fieldSerializers/fieldSerializer.types';

export const OneToOneFieldSerializer = (props: FieldSerializerProps) => {
    const { value } = props;
    return <Text>{value}</Text>;
};

export default OneToOneFieldSerializer;