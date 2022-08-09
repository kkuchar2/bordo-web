import React from 'react';

import {Link} from '@chakra-ui/react';
import {Link as ReactRouterLink, LinkProps} from 'react-router-dom';

export const NavLink = (props: LinkProps) => {

    const { children, ...rest } = props;

    return <Link as={ReactRouterLink} {...rest}>
        {children}
    </Link>;
};