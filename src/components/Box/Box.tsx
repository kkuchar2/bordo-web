import React, { ReactNode } from 'react';

import { StyledBox } from './style';

interface BoxProps {
    children: ReactNode;
    className?: string;
}

const Box = (props: BoxProps) => {

    const {children, className} = props;

    return <StyledBox className={className}>
        {children}
    </StyledBox>;
};

export default Box;