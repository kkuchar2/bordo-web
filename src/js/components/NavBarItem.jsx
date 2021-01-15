import React from 'react';
import {Link} from "react-router-dom";

import "componentStyles/NavBarItem.scss"

export default props => {

    const renderIcon = () => {
        if (props.iconSrc) {
            return  <img className={"navbar-item-icon"} src={props.iconSrc} width={30} height={30} alt={""}/>;
        }

        if (props.iconComponent) {
            console.log(props.iconComponent)
            return props.iconComponent
        }
    }

    return <Link onClick={props.onClick} to={props.href} className={[props.className, "navbar-item", props.customClass].join(' ')}>
        <div className={"navbar-item-text"}>
            {props.children}
        </div>
        {renderIcon()}
    </Link>
}