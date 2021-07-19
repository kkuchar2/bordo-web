import React from 'react';
import {Link} from "react-router-dom";

import "components/NavBar/NavBarItem.scss";

function NavbarItem(props) {

    const renderIcon = () => {
        if (props.iconSrc) {
            return <img className={"navbar-item-icon"} src={props.iconSrc} width={30} height={30} alt={""}/>;
        }

        if (props.iconComponent) {
            return props.iconComponent;
        }
    };

    const renderContent = () => {
        if (props.customComponent !== undefined) {
            return props.customComponent;
        }
        else {
            return renderIcon();
        }
    };

    return <Link onClick={props.onClick} to={props.href}
                 className={[props.className, "navbar-item", props.customClass].join(' ')}>
        <div className={"navbar-item-text"}>
            {props.children}
        </div>
        {renderContent()}
    </Link>;
}

export default NavbarItem;