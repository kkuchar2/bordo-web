import React, {useCallback, useMemo} from "react";

import {useMediaQuery} from "@mui/material";
import {IViewDescription, mainMenuItems} from "components/MainMenu/mainMenuItems";
import MenuItem from "components/MainMenu/MenuItem/MenuItem";
import {useTranslation} from "react-i18next";

import { StyledMainMenu, StyledMenuItems} from "./style";

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

    const menuItems = useMemo(() => {
        return Object.entries(mainMenuItems(t)).map((item, idx) => {
            const [key, value] = item;
            return <MenuItem
                key={value.id}
                name={value.displayName}
                icon={value.icon}
                onClick={() => onMenuItemClick(key)}
                active={openedView.id === value.id}/>;
        });
    }, [openedView, onMenuItemClick, t]);

    return <StyledMainMenu>
        <StyledMenuItems>
            {menuItems}
        </StyledMenuItems>
    </StyledMainMenu>;
};

export default MainMenu;