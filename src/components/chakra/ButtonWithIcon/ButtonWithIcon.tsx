import { ReactNode, useCallback, useState } from 'react';

import { Icon, IconProps } from '@/components/Icons/Icon';

interface ButtonWithIconProps {
    buttonType?: 'button' | 'submit' | 'reset';
    icon: IconProps,
    title: string,
    disabled?: boolean,
    iconColor?: string,
    iconColorHover?: string,
    children?: ReactNode,
    tabIndex?: number,
    className?: string
    onClick?: () => void,
}

export const ButtonWithIcon = (props: ButtonWithIconProps) => {

    const {
        icon, buttonType = 'button', tabIndex, iconColor, iconColorHover,
        title, onClick, className, children
    } = props;

    const [hovered, setHovered] = useState(false);

    const onMouseEnter = useCallback(() => {
        setHovered(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setHovered(false);
    }, []);

    return <button
        type={buttonType}
        tabIndex={tabIndex}
        title={title}
        className={['flex items-center gap-2', className].join(' ')}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}>
        {children}
        {icon ? <Icon {...icon} color={hovered ? iconColorHover : iconColor}/> : null}
    </button>;
};
