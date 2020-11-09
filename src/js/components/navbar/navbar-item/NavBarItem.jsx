import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "js/components/navbar/navbar-item/NavBarItem.scss"


class NavBarItem extends Component {
    render() {
        return (
            <Link to={this.props.href} className={"navbar-item"}>
                <div className={"navbar-item-text"}>
                    {this.props.children}
                </div>
                <img className={"navbar-item-icon"} src={this.props.iconSrc} width={30} height={30} alt={""}/>
            </Link>
        );
    }
}

export default NavBarItem;