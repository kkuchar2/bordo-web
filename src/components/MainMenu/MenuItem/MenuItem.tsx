import React, {useCallback, useState} from "react";

import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {Text} from "kuchkr-react-component-library";

import {StyledIconWrapper, StyledMenuItem, textTheme} from "./style";

export interface MenuItemProps {
    name: string,
    icon: typeof SvgIcon,
    onClick: Function,
    active: boolean
}

const MenuItem = (props: MenuItemProps) => {

    const {name, icon, onClick, active} = props;

    const onMenuItemClick = useCallback(() => onClick?.(), [onClick]);

    const [hovered, setHovered] = useState(false);

    const IconComponent = icon;

    const getTextColor = useCallback(() => {
        if (hovered && !active) {
            return "#c2c2c2";
        }

        return active ? "#6776ff" : "#929292";
    }, [active, hovered]);

    const onMouseEnter = useCallback((e) => {
        setHovered(true);
    }, []);

    const onMouseLeave = useCallback((e) => {
        setHovered(false);
    }, []);

    return <StyledMenuItem active={active} onClick={onMenuItemClick} onMouseEnter={onMouseEnter}
                           onMouseLeave={onMouseLeave}>
        <StyledIconWrapper>
            <IconComponent style={{color: getTextColor()}}/>
        </StyledIconWrapper>
        <Text theme={textTheme(getTextColor())} text={name}/>
    </StyledMenuItem>;
};

export default MenuItem;