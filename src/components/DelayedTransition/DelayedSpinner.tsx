import React, { ReactNode, useEffect, useRef, useState } from 'react';

import { FlexProps } from '@chakra-ui/layout';
import { Box, BoxProps, Flex, Spinner, SpinnerProps } from '@chakra-ui/react';

interface DelayedSpinnerProps {
    pending: boolean;
    delay?: number;
    children?: ReactNode;
    boxProps?: BoxProps;
    spinnerProps?: SpinnerProps;
    flexProps?: FlexProps;
}

export const DelayedSpinner = (props: DelayedSpinnerProps) => {

    const { children, pending, delay = 300, boxProps = {}, spinnerProps = {}, flexProps = {} } = props;

    const timerRef = useRef<number | null>(null);

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

    return showProgress ? <Box {...boxProps}>
        <Flex {...flexProps}>
            <Spinner {...spinnerProps}/>
            {children}
        </Flex>
    </Box> : null;
};