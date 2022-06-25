import React, {useCallback, useState} from "react";

import {Text} from "kuchkr-react-component-library";

import {IconProps} from "../../../icon/icon.types";

import {StyledMenuItem, textTheme} from "./style";

export interface MenuItemProps {
    name: string,
    icon?: IconProps,
    onClick: Function,
    active?: boolean,
}

const MenuItem = (props: MenuItemProps) => {

    const { name, icon, onClick, active } = props;

    const onMenuItemClick = useCallback(() => onClick?.(), [onClick]);

    const [hovered, setHovered] = useState(false);

    const getTextColor = useCallback(() => {
        if (hovered && !active) {
            return "#e8e8e8";
        }

        return active ? "#ffffff" : "#bababa";
    }, [active, hovered]);

    const onMouseEnter = useCallback(() => {
        setHovered(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setHovered(false);
    }, []);

    return <StyledMenuItem active={active} onClick={onMenuItemClick} onMouseEnter={onMouseEnter}
                           onMouseLeave={onMouseLeave}>
        {icon ? <icon.component className={`h-4 w-4 mr-2 ${icon.color}`}/> : null}
        <Text theme={textTheme(getTextColor())} text={name}/>
    </StyledMenuItem>;
};

export default MenuItem;