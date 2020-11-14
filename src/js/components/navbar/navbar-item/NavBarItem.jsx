import React, {Component} from 'react';
import {Link} from "react-router-dom";

import "./NavBarItem.scss"

class NavBarItem extends Component {
    render() {
        return (
            <Link onClick={this.props.onClick} to={this.props.href} className={"navbar-item"}>
                <div className={"navbar-item-text"}>
                    {this.props.children}
                </div>
                <img className={"navbar-item-icon"} src={this.props.iconSrc} width={30} height={30} alt={""}/>
            </Link>
        );
    }
}

export default NavBarItem;