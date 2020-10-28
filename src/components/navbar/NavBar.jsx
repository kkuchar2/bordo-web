import React, {Component} from 'react';

import "./NavBar.scss"

class NavBar extends Component {

    render() {
        return (
            <div className={"navbar"}>
                <div className={"navbar-items"}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default NavBar;