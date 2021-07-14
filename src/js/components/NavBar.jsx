import {faHome} from "@fortawesome/free-solid-svg-icons";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import NavBarItem from "components/NavBarItem";

import "componentStyles/NavBar.scss";
import {Button} from "kuchkr-react-component-library";
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {selectorAuth, tryLogout} from "redux/reducers/api/account";
import {closeNavbar, openNavbar} from "redux/reducers/application";

import {routes} from "routes/routes.js";

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
            dispatch(closeNavbar());
        }
        else {
            dispatch(openNavbar());
        }
    };

    const renderLogoutButton = useCallback(() => {
        if (authState.isUserLoggedIn) {
            return <Button style={{marginRight: 20, marginLeft: 10}} theme={Button.darkTheme} text={"Logout"} onClick={logout} />;
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
            <img src={"images/hamburger_icon.png"} alt={""} width={18} height={18}/>
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