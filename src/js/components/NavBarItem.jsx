import React from 'react';
import {Link} from "react-router-dom";

import "componentStyles/NavBarItem.scss"

export default props => {

    const renderIcon = () => {
        if (props.iconSrc) {
            return  <img className={"navbar-item-icon"} src={props.iconSrc} width={30} height={30} alt={""}/>;
        }
    }

    return <Link onClick={props.onClick} to={props.href} className={[props.className, "navbar-item"].join(' ')}>
        <div className={"navbar-item-text"}>
            {props.children}
        </div>
        {renderIcon()}
    </Link>
}