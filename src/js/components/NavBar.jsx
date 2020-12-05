import React from 'react';
import {Link} from "react-router-dom";
import SubmitButton from "components/SubmitButton.jsx";
import NavBarItem from "components/NavBarItem.jsx";
import {routes} from "routes/Routes.jsx";

import {useDispatch, useSelector } from "react-redux";


import { useCallback } from "react";

import "componentStyles/NavBar.scss"
import {navbarActions} from "redux/actions";

const mapRoutes = actionOnClick => {
    return routes.filter(v => v.navbar).map((p, k) => {
        return <NavBarItem onClick={actionOnClick} iconSrc={p.icon} href={p.path} key={k}>{p.title}</NavBarItem>
    });
};

export default props => {
    const dispatch = useDispatch()
    const navbar = useSelector(state => state.navbar)

    const clickMenuAction = useCallback(() => navbarActions.press(dispatch), [dispatch]);
    const onLinkClickAction = useCallback(() => navbarActions.close(dispatch), [dispatch]);

    const renderItems = () => <>{mapRoutes(onLinkClickAction)}</>;

    const renderResponsiveMenu = () => {
        if (navbar.opened) {
            return <div className={"navbar-items-list"}>{renderItems()}</div>
        }
    }

    const renderClassicMenu = () => {
        if (!navbar.opened) {
            return <div className={"navbar-items"}>{renderItems()}</div>
        }
    }

    return (
        <div className={"navbar"}>
            <div className={"navbar-group"}>
                <SubmitButton onClick={clickMenuAction} className={"hamburger"}>
                    <img src={"images/hamburger_icon.png"} alt={""} width={20} height={20}/>
                </SubmitButton>

                <Link to={'/'} onClick={onLinkClickAction} className={"textContainer"}>Krzysztof Kucharski</Link>

                {renderClassicMenu()}

            </div>
            {renderResponsiveMenu()}
        </div>
    );
}