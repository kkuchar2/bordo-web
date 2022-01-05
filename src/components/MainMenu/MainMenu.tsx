import React, {useCallback} from "react";

import {useMediaQuery} from "@material-ui/core";
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import AccountDisplay from "components/AccountDisplay/AccountDisplay";
import {IViewDescription, mainMenuItems} from "components/MainMenu/mainMenuItems";
import MenuItem from "components/MainMenu/MenuItem/MenuItem";
import {Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";

import {menuTitleTheme, StyledMainMenu, StyledMenuButton, StyledMenuItems, StyledMenuSection} from "./style";

export interface MainMenuProps {
    onItemClick: Function,
    openedView: IViewDescription
}

const MainMenu = (props: MainMenuProps) => {

    const {onItemClick, openedView} = props;

    const isMobile = useMediaQuery('(max-width: 600px)');

    const {t} = useTranslation();

    const onMenuItemClick = useCallback(key => {
        onItemClick?.(key);
    }, [onItemClick]);

    const renderMenuItems = useCallback(() => {
        return Object.entries(mainMenuItems(t)).map((item, idx) => {
            const [key, value] = item;
            return <MenuItem
                key={value.id}
                name={value.displayName}
                icon={value.icon}
                onClick={() => onMenuItemClick(key)}
                active={openedView.id === value.id}/>;
        });
    }, [openedView, t]);

    const renderMenu = useCallback(() => {
        if (isMobile) {
            return <StyledMenuButton>
                <FilterListOutlinedIcon fontSize={'large'}/>
            </StyledMenuButton>;
        }
        return <StyledMenuItems>
            <Text theme={menuTitleTheme} text={'MENU'}/>
            {renderMenuItems()}
        </StyledMenuItems>;
    }, [isMobile, openedView]);

    return <StyledMainMenu>
        <StyledMenuSection>
            <AccountDisplay/>
            {renderMenu()}
        </StyledMenuSection>
    </StyledMainMenu>;
};

export default MainMenu;