import React, {useEffect, useState} from 'react';

import {routes} from "routes/Routes.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setClosed, setOpened, switchThemeRedux} from "redux/actions";

import Button from "components/Button.jsx";
import NavBarItem from "components/NavBarItem.jsx";
import Switch from "components/Switch.jsx";

import "componentStyles/NavBar.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";

const mapRoutes = actionOnClick => {
    return routes.filter(v => v.navbar).map((p, k) => {
        return <NavBarItem onClick={actionOnClick} iconSrc={p.icon} href={p.path} key={k}>{p.title}</NavBarItem>
    });
};
export default () => {

    const [width, setWidth] = useState(0);
    const [navbarAnimClass, setNavbarAnimClass] = useState('');

    const dispatch = useDispatch();

    const setNavbarOpened = setOpened(dispatch);
    const setNavbarClosed = setClosed(dispatch);

    const navbarState = useSelector(state => state.navbar);
    const theme = useSelector(state => state.theme);

    const onLinkClickAction = setNavbarClosed;

    const switchTheme = switchThemeRedux(dispatch);

    const renderItems = () => <>{mapRoutes(onLinkClickAction)}</>;

    useEffect(() => {
        const updateSize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize)
    }, []);

    useEffect(() => {
        if (width >= 800) {
            setNavbarAnimClass("");
            setNavbarClosed();
        }
    }, [width])

    useEffect(() => {
        if (width >= 800) {
            setNavbarAnimClass("");
            setNavbarClosed();
        }
    }, [navbarState.opened])

    useEffect(() => {
        if (window.innerWidth <= 800) {
            setNavbarAnimClass("opened-" + navbarState.opened);
        }
    }, [navbarState.opened]);

    const hamburgerClick = () => {
        if (navbarState.opened) {
            setNavbarClosed();
        }
        else {
            setNavbarOpened();
        }
    }

    return (
        <div className={"navbar"}>
            <div className="main-buttons">
                <Button onClick={hamburgerClick} className={"hamburger"}>
                    <img src={"images/hamburger_icon.png"} alt={""} width={20} height={20}/>
                </Button>

                <NavBarItem className={"homeIcon"} onClick={() => {
                }} href={'/'}>
                    <FontAwesomeIcon className={"icon"} icon={faHome}/>
                </NavBarItem>
            </div>

            <div className={["navbar-group", navbarAnimClass].join(' ')}>
                <div className={"navbar-items"}>{renderItems()}</div>
            </div>

            <Switch className={"theme-switch"} value={theme.theme === 'theme-dark'} onValueChange={switchTheme}/>
        </div>
    );
}