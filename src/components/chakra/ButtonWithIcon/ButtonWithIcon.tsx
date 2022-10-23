import React, {ComponentProps, useCallback, useState} from 'react';

import {Button, ButtonProps} from '@chakra-ui/react';

interface ButtonWithIconProps {
    IconComponent: React.FC<ComponentProps<'svg'>>
    iconColor?: string,
    iconColorHover?: string,
    iconSize?: number,
}

export const ButtonWithIcon = (props: ButtonWithIconProps & ButtonProps) => {

    const { IconComponent, iconSize = 20, iconColor, iconColorHover, ...rest } = props;

    const [hovered, setHovered] = useState(false);

    const iconSizePx = `${iconSize}px`;

    const onMouseEnter = useCallback(() => {
        setHovered(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setHovered(false);
    }, []);

    return <Button {...rest} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {rest.children}
        {IconComponent ?
            <IconComponent width={iconSizePx}
                           height={iconSizePx} color={hovered ? iconColorHover : iconColor}/> : null}
    </Button>;
};