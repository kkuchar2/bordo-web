import React from 'react';

import {Text} from '@chakra-ui/react';

import {DelayedSpinner} from './DelayedSpinner';

interface FullSizeDelayedSpinnerProps {
    pending: boolean;
    delay?: number;
    message?: string;
}

export const FullSizeDelayedSpinner = (props: FullSizeDelayedSpinnerProps) => {

    const { pending, delay = 300, message = '' } = props;

    return <DelayedSpinner pending={pending}
                           delay={delay}
                           boxProps={{
                               margin: '0 !important',
                               display: 'flex',
                               position: 'absolute',
                               alignItems: 'center',
                               justifyContent: 'center',
                               zIndex: 1,
                               top: 0,
                               left: 0,
                               bg: 'rgba(39,39,39,0.83)',
                               w: '100%',
                               h: '100%'
                           }}
                           flexProps={{
                               direction: 'column',
                               alignItems: 'center',
                               justifyContent: 'center',
                               gap: '20px'
                           }}
                           spinnerProps={{
                               thickness: '4px',
                               speed: '1s',
                               emptyColor: 'transparent',
                               color: 'rgba(204,17,139,0.65)',
                               size: 'xl'
                           }}>
        <Text fontWeight={'semibold'}>{message}</Text>
    </DelayedSpinner>;
};