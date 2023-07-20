import React from 'react';

import { Flex, FlexProps } from '@chakra-ui/react';

export const CenterFlex = (props: FlexProps) => {

    const { children, ...rest } = props;

    return <Flex justify={'center'} align={'center'} {...rest}>
        {children}
    </Flex>;
};