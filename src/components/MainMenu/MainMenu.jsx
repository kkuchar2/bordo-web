import {useMediaQuery} from "@material-ui/core";
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import AcccountDisplay from "components/AccountDisplay/AccountDisplay.jsx";
import {animatedWindowProps} from "components/FormComponents/animation.js";
import {mainMenuItems} from "components/MainMenu/mainMenuItems.js";
import MenuItem from "components/MainMenu/MenuItem/MenuItem.jsx";
import {StyledMainMenu, StyledMenuButton, StyledMenuItems, StyledMenuSection} from "components/MainMenu/style.js";
import React, {useCallback} from "react";

const MainMenu = (props) => {

    const {onItemClick, openedView} = props;

    const isMobile = useMediaQuery('(max-width: 600px)');

    const onMenuItemClick = useCallback(key => {
        onItemClick?.(key);
    }, [onItemClick]);

    const renderMenuItems = useCallback(() => {
        return Object.entries(mainMenuItems).map((item, idx) => {
            const [key, value] = item;
            return <MenuItem
                key={idx}
                name={value.displayName}
                icon={value.icon}
                onClick={() => onMenuItemClick(key)}
                active={openedView.id === key}/>;
        });
    }, [openedView]);

    const renderMenu = useCallback(() => {
        if (isMobile) {
            return <StyledMenuButton>
                <FilterListOutlinedIcon fontSize={'large'}/>
            </StyledMenuButton>;
        }
        return <StyledMenuItems>
            {renderMenuItems()}
        </StyledMenuItems>;
    }, [isMobile]);

    return <StyledMainMenu {...animatedWindowProps}>
        <StyledMenuSection>
            <AcccountDisplay showLogoutButton={true}/>
            {renderMenu()}
        </StyledMenuSection>
    </StyledMainMenu>;
};

export default MainMenu;