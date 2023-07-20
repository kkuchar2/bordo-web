import React, { ComponentProps, useCallback, useState } from 'react';

import { Button, Circle } from '@chakra-ui/react';

interface ButtonWithCircleIconProps {
    IconComponent: React.FC<ComponentProps<'svg'>>
    circleSize?: number,
    circleBg?: string,
    circleBgHover?: string,
    bg?: string,
    bgHover?: string,
    bgFocus?: string,
    iconColor?: string,
    iconColorHover?: string,
    size?: number,
    title?: string,
    iconSize?: number,
    onClick?: () => void
}

export const ButtonWithCircleIcon = (props: ButtonWithCircleIconProps) => {

    const {
        IconComponent,
        circleBg = 'none',
        circleBgHover = 'none',
        bg = 'none',
        bgHover = 'none',
        bgFocus = 'none',
        size = 40,
        circleSize = 40,
        iconSize = 20,
        iconColor,
        iconColorHover,
        onClick,
        title
    } = props;

    const [hovered, setHovered] = useState(false);

    const sizePx = `${size}px`;
    const iconSizePx = `${iconSize}px`;

    const onMouseEnter = useCallback(() => {
        setHovered(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setHovered(false);
    }, []);

    return <Button width={sizePx}
        height={sizePx}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        minWidth={0}
        title={title}
        padding={0}
        bg={bg}
        _focus={{
            bg: bgFocus
        }}
        _hover={{
            bg: bgHover
        }}
        onClick={onClick}>
        <Circle bg={hovered ? circleBgHover : circleBg} size={`${circleSize}px`}>
            <IconComponent width={iconSizePx} height={iconSizePx} color={hovered ? iconColorHover : iconColor}/>
        </Circle>
    </Button>;
};