import React, {useEffect, useState, useCallback} from 'react';

import {routes} from "routes/routes.js";
import {useDispatch, useSelector} from "react-redux";
import {faHome} from "@fortawesome/free-solid-svg-icons";

import Button from "components/Button";
import NavBarItem from "components/NavBarItem";
import Switch from "components/Switch";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {selectorAuth, tryLogout} from "redux/reducers/api/account";
import {closeNavbar, openNavbar, switchTheme} from "redux/reducers/application";

import "componentStyles/NavBar.scss";

const getAlignedRoutes = alignment => routes.filter(v => v.navbar).filter(v => v.alignment === alignment);

const mapRoutes = actionOnClick => getAlignedRoutes('left').map((p, k) => {
    return <NavBarItem onClick={actionOnClick} iconSrc={p.icon} href={p.path} key={k}>{p.title}</NavBarItem>;
});

const mapRightNavbarRoutes = (status, isLoggedIn, actionOnClick) => {
     return getAlignedRoutes('right').map((p, k) => {
        if (isLoggedIn && p.authRequired || !isLoggedIn && !p.authRequired) {
            return <NavBarItem
                onClick={actionOnClick}
                iconSrc={p.icon}
                customClass={p.customClass}
                customComponent={p.customComponent}
                iconComponent={p.iconComponent}
                href={p.path}
                key={k}>{p.title}
            </NavBarItem>;
        }
    });
};

function NavBar() {

    const [width, setWidth] = useState(0);
    const [navbarAnimClass, setNavbarAnimClass] = useState('');

    const dispatch = useDispatch();
    const authState = useSelector(selectorAuth);

    const navbarState = useSelector(state => state.navbar);
    const theme = useSelector(state => state.theme);

    const onLinkClickAction = () => dispatch(openNavbar());

    const renderItems = () => <>{mapRoutes(onLinkClickAction)}</>;

    const renderRightNavbarItems = (status, isLoggedIn) => <>{mapRightNavbarRoutes(status, isLoggedIn, onLinkClickAction)}</>;

    useEffect(() => {
        const updateSize = () => setWidth(window.innerWidth);
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        setNavbarAnimClass("");
        dispatch(closeNavbar());
    }, [width]);

    useEffect(() => {
        if (window.innerWidth <= 800) {
            setNavbarAnimClass("opened-" + navbarState.opened);
        }
    }, [navbarState.opened]);

    const hamburgerClick = () => {
        if (navbarState.opened) {
            closeNavbar();
        }
        else {
            setNavbarOpened();
        }
    };

    const renderLogoutButton = useCallback(() => {
        if (authState.isUserLoggedIn) {
            return <Button text={"Logout"} onClick={logout} className={"logoutButton"}/>;
        }
    }, [authState]);

    const logout = useCallback(() => dispatch(tryLogout()), []);

    const renderEmail = useCallback(() => {
        if (authState.isUserLoggedIn) {
            return <div className={"email"}>{authState.email}</div>;
        }
    }, [authState]);

    const renderRightAlignedItems = useCallback(() => {
        if (authState.status === 'SENT_AUTOLOGIN_REQUEST') {
            return <div className={"loadingIndicator"}/>;
        }

        return <div className={"navbar-items"}>
            {renderEmail()}
            <div className={"navbarButtons"}>
                {renderRightNavbarItems(authState.status, authState.isUserLoggedIn)}
            </div>
            ;
        </div>;
    }, [authState]);

    const renderNavbarItems = useCallback(() => {

        if (width > 800 || (width < 800 && navbarState.opened)) {
            return <div className={["navbar-group", navbarAnimClass].join(' ')}>
                <div className={"navbar-items"}>{renderItems()}</div>

                <div className={["right-aligned", navbarAnimClass].join(' ')}>
                    {renderRightAlignedItems()}
                </div>
            </div>;
        }
    }, [navbarState, navbarAnimClass, width, authState]);

    return <div className={"navbar"}>
        <div className="main-buttons">
            <NavBarItem className={"home"} onClick={() => {}} href={'/'}>
                <FontAwesomeIcon className={"icon"} icon={faHome}/>
            </NavBarItem>

            <Button onClick={hamburgerClick} className={"hamburger"}>
                <img src={"images/hamburger_icon.png"} alt={""} width={20} height={20}/>
            </Button>
        </div>

        {renderNavbarItems()}
        {renderLogoutButton()}

        <Switch className={"theme-switch"} value={theme.theme === 'theme-dark'} onValueChange={() => dispatch(switchTheme())}/>
    </div>;
}

export default NavBar;