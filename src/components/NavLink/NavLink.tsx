import { ReactNode } from 'react';

import Link, { LinkProps } from 'next/link';

interface NavLinkProps {
    disabled?: boolean;
    children: ReactNode;
    className?: string;
}

export const NavLink = (props: LinkProps & NavLinkProps) => {

    const { children, disabled, ...rest } = props;

    return <Link
        style={{
            pointerEvents: disabled ? 'none' : 'auto',
            opacity: disabled ? 0.3 : 1
        }}
        {...rest}>
        {children}
    </Link>;
};