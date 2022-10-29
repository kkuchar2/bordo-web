import React, {ComponentProps, useCallback, useState} from 'react';

interface ButtonWithIconProps {
    buttonType?: 'button' | 'submit' | 'reset';
    IconComponent: React.FC<ComponentProps<'svg'>>
    iconColor?: string,
    title: string,
    disabled?: boolean,
    iconColorHover?: string,
    iconSize?: number,
    children?: React.ReactNode,
    tabIndex?: number,
    className?: string
    onClick?: () => void,
}

export const ButtonWithIcon = (props: ButtonWithIconProps) => {

    const {
        IconComponent, buttonType = 'button', tabIndex, iconSize = 20, iconColor, iconColorHover,
        title, onClick, className, children
    } = props;

    const [hovered, setHovered] = useState(false);

    const iconSizePx = `${iconSize}px`;

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
        {IconComponent ?
            <IconComponent width={iconSizePx}
                           height={iconSizePx} color={hovered ? iconColorHover : iconColor}/> : null}
    </button>;
};
