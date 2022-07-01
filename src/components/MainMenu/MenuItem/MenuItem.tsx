import React, {useCallback} from 'react';

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

    return <StyledMenuItem active={active} onClick={onMenuItemClick}>
        <div
            className={'duration-[600ms] transition ease-in-out text-[14px] text-navbar-item-color-light dark:text-navbar-item-color-dark hover:text-white'}>{name}</div>
        <div className={'flex-grow flex justify-end'}>
            {icon ? <icon.component
                className={`mr-0 block sm:hidden lg:block h-4 w-4  ${icon.color}`}/> : null}
        </div>
    </StyledMenuItem>;
};

export default MenuItem;
