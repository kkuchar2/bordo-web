import React, {ReactNode, useEffect, useRef, useState} from 'react';

import {FlexProps} from '@chakra-ui/layout';
import {Box, BoxProps, Flex, Spinner, SpinnerProps} from '@chakra-ui/react';
import {opacityShowUpAnimation} from 'components/Forms/animation';
import {motion} from 'framer-motion';

interface DelayedSpinnerProps {
    pending: boolean;
    delay?: number;
    children?: ReactNode;
    boxProps?: BoxProps;
    spinnerProps?: SpinnerProps;
    flexProps?: FlexProps;
}

const MotionBox = motion(Box);

export const DelayedSpinner = (props: DelayedSpinnerProps) => {

    const { children, pending, delay = 300, boxProps = {}, spinnerProps = {}, flexProps = {} } = props;

    const timerRef = useRef<number>(null);

    const [showProgress, setShowProgress] = useState(false);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (pending) {
            timerRef.current = window.setTimeout(() => {
                setShowProgress(true);
            }, delay);
        }
        else {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        }
    }, [pending]);

    if (!pending) {
        return null;
    }

    return showProgress ? <MotionBox {...boxProps} {...opacityShowUpAnimation}>
        <Flex {...flexProps}>
            <Spinner {...spinnerProps}/>
            {children}
        </Flex>
    </MotionBox> : null;
};