import React, {Component} from 'react';

import SubmitButton from "components/buttons/SubmitButton.jsx";

import "./NavBar.scss"

class NavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuVisible: false
        }
    }

    renderMenu() {
        if (this.state.menuVisible) {
            return <div className={"navbar-items-list"}>
                {this.props.children}
            </div>
        }
    }

    onMenuClick = e => {
        this.setState({menuVisible: !this.state.menuVisible})
    };

    render() {
        return (
            <div className={"navbar-group"}>
                <div className={"navbar"}>
                    <SubmitButton onClick={this.onMenuClick} className={"hamburger"}>
                        <img src={"src/images/hamburger_icon.png"} alt={""} width={20} height={20}/>
                    </SubmitButton>
                    <div className={"titleContainer"}>
                        <a href={'/'} className={"title"}>Krzysztof Kucharski</a>
                    </div>

                    <div className={"navbar-items"}>
                        {this.props.children}
                    </div>
                </div>
                { this.renderMenu() }
            </div>
        );
    }
}

export default NavBar;