import React from 'react';

import {Text, TextProps} from '@chakra-ui/react';
import {shakeAnimation} from 'components/Forms/animation';
import {motion} from 'framer-motion';

const MotionText = motion(Text);

export const ErrorText = (props: TextProps) => {

    const { children, ...rest } = props;

    return <MotionText color={'#ff4949'} fontSize={'14px'} {...rest} {...shakeAnimation}>
        {children}
    </MotionText>;
};