import React, {useCallback, useState} from 'react';

import {IconProps} from '../../../icon/icon.types';

import {StyledMenuItem} from './style';

export interface MenuItemProps {
    name: string;
    icon?: IconProps;
    onClick?: Function;
    active?: boolean;
}

const MenuItem = (props: MenuItemProps) => {
    const { name, icon, onClick, active } = props;

    const onMenuItemClick = useCallback(() => onClick?.(), [onClick]);

    const [hovered, setHovered] = useState(false);

    const getTextColor = useCallback(() => {
        if (hovered && !active) {
            return '#e8e8e8';
        }

        return active ? '#ffffff' : '#d7d7d7';
    }, [active, hovered]);

    const onMouseEnter = useCallback(() => {
        setHovered(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setHovered(false);
    }, []);

    return <StyledMenuItem active={active} onClick={onMenuItemClick} onMouseEnter={onMouseEnter}
                           onMouseLeave={onMouseLeave}>
        <div className={'text-[14px] text-[#e8e8e8] hover:text-white'}>{name}</div>
        <div className={'flex-grow flex justify-end'}>
            {icon ? <icon.component
                className={`mr-0 block sm:hidden lg:block h-4 w-4  ${icon.color}`}/> : null}
        </div>
    </StyledMenuItem>;
};

export default MenuItem;
