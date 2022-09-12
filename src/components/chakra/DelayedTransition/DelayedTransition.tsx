import React, {ReactNode, useEffect, useRef, useState} from 'react';

import {Box, BoxProps, Progress} from '@chakra-ui/react';

interface DelayedTransitionProps {
    pending: boolean;
    children?: ReactNode;
    delay?: number;
}

export const DelayedTransition = (props: DelayedTransitionProps & BoxProps) => {

    const { children, pending, delay = 300, ...rest } = props;

    const timerRef = useRef<number>(null);

    const [showProgress, setShowProgress] = useState(false);

    useEffect(() => {

        timerRef.current = window.setTimeout(() => {
            setShowProgress(true);
        }, delay);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    if (!pending || !showProgress) {
        return null;
    }

    return <Box {...rest}>
        <Progress size={'xs'} isIndeterminate/>
        {children}
    </Box>;
};