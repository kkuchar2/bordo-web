import React from 'react';
import {Link} from "react-router-dom";

import "componentStyles/NavBarItem.scss"

export default props => {
    return <Link onClick={props.onClick} to={props.href} className={"navbar-item"}>
        <div className={"navbar-item-text"}>
            {props.children}
        </div>
        <img className={"navbar-item-icon"} src={props.iconSrc} width={30} height={30} alt={""}/>
    </Link>
}