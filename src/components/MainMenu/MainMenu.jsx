import {faCog, faColumns, faHome, faLightbulb, faUser} from "@fortawesome/free-solid-svg-icons";
import AcccountDisplay from "components/AccountDisplay/AccountDisplay.jsx";
import {animatedWindowProps} from "components/FormComponents/animation.js";
import MenuItem from "components/MainMenu/MenuItem/MenuItem.jsx";
import {StyledMainMenu} from "components/MainMenu/style.js";
import React, {useCallback} from "react";

const MainMenu = (props) => {

    const {onItemClick} = props;

    const onMenuItemClick = useCallback(name => {
        if (onItemClick) {
            onItemClick(name);
        }
    }, [onItemClick]);

    return <StyledMainMenu {...animatedWindowProps}>
        <div className={"menuSection"}>
            <div className={"menuItems"}>
                <AcccountDisplay showLogoutButton={true}/>
                <MenuItem name={"Dashboard"} icon={faHome} color={"#008742"} onClick={onMenuItemClick}/>
                <MenuItem name={"Settings"} icon={faCog} color={"#af3333"} onClick={onMenuItemClick}/>
            </div>
        </div>
    </StyledMainMenu>;
};

export default MainMenu;