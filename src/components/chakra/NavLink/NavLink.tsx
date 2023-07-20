import React from 'react';

import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import Link, { LinkProps } from 'next/link';

interface NavLinkProps {
    disabled?: boolean;
}

export const NavLink = (props: LinkProps & ChakraLinkProps & NavLinkProps) => {

    const { children, disabled, ...rest } = props;

    return <ChakraLink pointerEvents={disabled ? 'none' : 'auto'}
        opacity={disabled ? 0.3 : 1}
        as={Link}
        {...rest}>
        {children}
    </ChakraLink>;
};