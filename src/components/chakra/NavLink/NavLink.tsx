import React from 'react';

import {Link, LinkProps as ChakraLinkProps} from '@chakra-ui/react';
import {Link as ReactRouterLink, LinkProps} from 'react-router-dom';

interface NavLinkProps {
    disabled?: boolean;
}

export const NavLink = (props: LinkProps & ChakraLinkProps & NavLinkProps) => {

    const { children, disabled, ...rest } = props;

    return <Link pointerEvents={disabled ? 'none' : 'auto'}
                 opacity={disabled ? 0.3 : 1}
                 as={ReactRouterLink}
                 {...rest}>
        {children}
    </Link>;
};