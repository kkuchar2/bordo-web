import {faHome} from "@fortawesome/free-solid-svg-icons";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {selectorAuth, tryLogout} from "appRedux/reducers/api/account";
import {closeNavbar, openNavbar} from "appRedux/reducers/application";

import "components/NavBar/NavBar.scss";

import NavBarItem from "components/NavBar/NavBarItem.jsx";
import {Button} from "kuchkr-react-component-library";
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {routes} from "routes.js";

const hamburgerButtonTheme = {
    width: "40px",
    height: "40px",
    background: "transparent",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "#393939",
    border: "none",
    borderRadius: "0px",

    text: {
        textColor: "#e5e5e5",
        disabledTextColor: "rgba(255,255,255,0.20)"
    }
};

const logoutButtonTheme = {
    width: "200px",
    height: "40px",
    background: "#3b53bb",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "#435ec6",
    border: "none",
    borderRadius: "50px",

    text: {
        fontSize: "14px",
        textColor: "#ffffff",
        disabledTextColor: "rgba(255,255,255,0.20)"
    }
};

const buttonTheme = {
    width: "40px",
    height: "40px",
    background: "#ffffff",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "#393939",
    border: "none",
    borderRadius: "0px",

    text: {
        textColor: "#e5e5e5",
        disabledTextColor: "rgba(255,255,255,0.20)"
    }
};

const getAlignedRoutes = alignment => routes.filter(v => v.navbar).filter(v => v.alignment === alignment);

const mapRoutes = actionOnClick => getAlignedRoutes('left').map((p, k) => {
    return <NavBarItem onClick={actionOnClick} iconSrc={p.icon} href={p.path} key={k}>{p.title}</NavBarItem>;
});

const mapRightNavbarRoutes = (isLoggedIn, actionOnClick) => {
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

    const renderRightNavbarItems = (isLoggedIn) => <>{mapRightNavbarRoutes(isLoggedIn, onLinkClickAction)}</>;

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
            dispatch(closeNavbar());
        }
        else {
            dispatch(openNavbar());
        }
    };

    const renderLogoutButton = useCallback(() => {
        if (authState.loggedIn) {
            return <Button style={{marginRight: 20, marginLeft: 10}} theme={logoutButtonTheme} text={"Logout"} onClick={logout} />;
        }
    }, [authState]);

    const logout = useCallback(() => dispatch(tryLogout()), []);

    const renderEmail = useCallback(() => {
        if (authState.loggedIn) {
            return <div className={"email"}>{authState.user.email}</div>;
        }
    }, [authState]);

    const renderRightAlignedItems = useCallback(() => {
        return <div className={"navbar-items"}>
            {renderEmail()}
            <div className={"navbarButtons"}>
                {renderRightNavbarItems(authState.loggedIn)}
            </div>
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

    const renderHamburgerButton = useCallback(() => {
        if (width > 800) {
            return;
        }

        return <Button style={{display: "flex", alignItems: "center", justifyContent: "center"}}
                       theme={hamburgerButtonTheme} onClick={hamburgerClick}>
            <img src={"assets/images/hamburger_icon.png"} alt={""} width={18} height={18}/>
        </Button>;
    }, [width]);

    const renderHomeButton = useCallback(() => {
        if (width < 800) {
            return;
        }

        return <Link to={'/'} style={{marginLeft: 10, display: "flex", alignItems: "center", justifyContent: "center"}}>
            <FontAwesomeIcon icon={faHome} style={{color: "#ffffff", fontSize: 24}}/>
        </Link>;

    }, [width]);

    return <div className={"navbar"}>
        <div className="main-buttons">
            {renderHomeButton()}
            {renderHamburgerButton()}
        </div>
        {renderNavbarItems()}
        {renderLogoutButton()}
    </div>;
}

export default NavBar;