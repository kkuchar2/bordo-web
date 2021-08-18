import {animatedWindowProps} from "components/FormComponents/animation.js";
import {StyledIconWrapper, StyledMenuItem, textTheme} from "components/MainMenu/MenuItem/style.js";
import {Text} from "kuchkr-react-component-library";

import React, {useCallback} from "react";

const MenuItem = (props) => {

    const {name, icon, onClick, active} = props;

    const onMenuItemClick = useCallback(() => onClick?.(), [onClick]);

    const IconComponent = icon;

    return <StyledMenuItem {...animatedWindowProps} onClick={onMenuItemClick}>
        {/*<StyledActiveIndicator active={active}/>*/}
        <StyledIconWrapper>
            <IconComponent style={{color: active ? "rgba(0,180,105,1)" : "#929292"}}/>
        </StyledIconWrapper>
        <Text style={{color: active ? "rgba(0,180,105,1)" : "#929292"}} theme={textTheme} text={name}/>
    </StyledMenuItem>;
};

export default MenuItem;