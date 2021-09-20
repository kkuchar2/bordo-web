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
            return "#3b3b3b";
        }

        return active ? "#4977C8" : "#929292";
    }, [active, hovered]);

    const onMouseEnter = useCallback((e) => {
        setHovered(true);
    }, []);

    const onMouseLeave = useCallback((e) => {
        setHovered(false);
    }, []);

    return <StyledMenuItem active={active} onClick={onMenuItemClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {/*<StyledActiveIndicator active={active}/>*/}
        <StyledIconWrapper>
            <IconComponent style={{transition: "0.3s all ease-out", color: getTextColor()}}/>
        </StyledIconWrapper>
        <Text style={{transition: "0.3s all ease-out", color: getTextColor()}} theme={textTheme} text={name}/>
    </StyledMenuItem>;
};

export default MenuItem;