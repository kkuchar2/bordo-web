import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {animatedWindowProps} from "components/FormComponents/animation.js";
import {StyledMenuItem} from "components/MainMenu/MenuItem/style.js";

import React, {useCallback} from "react";

const MenuItem = (props) => {

    const {name, color, icon, onClick} = props;

    const onMenuItemClick = useCallback(() => {
        if (onClick) {
            onClick(name);
        }
    }, [onClick]);

    return <StyledMenuItem {...animatedWindowProps} onClick={onMenuItemClick}>
            <div className={"iconWrapper"} style={{background: color}}>
                <FontAwesomeIcon className={"icon"} icon={icon}/>
            </div>
            <div className={"menuItemText"}>{name}</div>
    </StyledMenuItem>;
};

export default MenuItem;