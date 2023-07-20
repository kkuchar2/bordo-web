import React from 'react';

import { Text, TextProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { shakeAnimation } from '@/components/Forms/animation';

const MotionText = motion(Text);

export const ErrorText = (props: TextProps) => {

    const { children, ...rest } = props;

    return <MotionText color={'#ff4949'}
        fontSize={'14px'}
        key={Math.random()}
        {...rest}
        {...shakeAnimation}>
        {children}
    </MotionText>;
};