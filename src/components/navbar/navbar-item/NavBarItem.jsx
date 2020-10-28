import React, {Component} from 'react';

import "./NavBarItem.scss"

class NavBarItem extends Component {
    render() {
        return (
            <div className={"navbar-item"}>
                <a className={"navbar-item-text"} href={this.props.href}>
                    {this.props.children}
                </a>
                <img className={"navbar-item-icon"} src={this.props.iconSrc} width={30} height={30} alt={""}/>
            </div>
        );
    }
}

export default NavBarItem;