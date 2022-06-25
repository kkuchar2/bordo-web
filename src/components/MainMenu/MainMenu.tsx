import React, {useCallback, useMemo, useState} from "react";

import {useAppDispatch} from "appRedux/store";
import {menuGroupTextTheme} from "components/AccountUnverified/style";
import {IViewDescription, mainMenuItems} from "components/MainMenu/mainMenuItems";
import MenuItem from "components/MainMenu/MenuItem/MenuItem";
import { useMediaQuery } from "hooks/useMediaQuery";
import {Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";

import { HamburgerButton } from "./HamburgerButton/HamburgerButton";
import {StyledMainMenu, StyledMenuGroupTitle, StyledMenuItems} from "./style";

export interface MainMenuProps {
    onItemClick: Function,
    openedView: IViewDescription
}

const MainMenu = (props: MainMenuProps) => {

    const { onItemClick, openedView } = props;

    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const isMobile = useMediaQuery('(max-width: 1200px)');

    const [navbarOpened, setNavbarOpened] = useState(false);

    const onMenuItemClick = useCallback(key => {
        onItemClick?.(key);
    }, [onItemClick]);

    const menuPageItems = useMemo(() => {
        return Object.entries(mainMenuItems.pages).map((item,) => {
            const [key, value] = item;
            return <MenuItem
                key={value.id}
                name={value.displayName}
                icon={value.icon}
                onClick={() => onMenuItemClick(key)}
                active={openedView.id === value.id}/>;
        });
    }, [openedView, onMenuItemClick]);

    const menuActionItems = useMemo(() => {
        return Object.entries(mainMenuItems.actions).map((item,) => {
            const [, value] = item;
            return <MenuItem
                key={value.id}
                icon={value.icon}
                name={value.displayName}
                onClick={() => value.onClick(dispatch)}/>;
        });
    }, [openedView, onMenuItemClick, t]);

    const onHamburgerClick = useCallback(() => {
        setNavbarOpened(!navbarOpened);
    }, [navbarOpened]);

    const renderHamburgerButton = useMemo(() => {
        if (!isMobile) {
            return null;
        }
        return <HamburgerButton onClick={onHamburgerClick} navbarOpened={false} topNavbarVisible={true}/>;
    }, [isMobile, navbarOpened]);

    return <StyledMainMenu>
        <StyledMenuItems>
            <StyledMenuGroupTitle>
                <Text theme={menuGroupTextTheme} text={t("PAGES")}/>
            </StyledMenuGroupTitle>
            {menuPageItems}
            <hr style={{border: 0, borderTop: "1px solid " + "#565656", width: "100%", background: "none"}} />
            {menuActionItems}
            <hr style={{border: 0, borderTop: "1px solid " + "#565656", width: "100%", background: "none"}} />
        </StyledMenuItems>
        {renderHamburgerButton}
    </StyledMainMenu>;
};

export default MainMenu;