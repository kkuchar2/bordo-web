import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import SubmitButton from "js/components/buttons/SubmitButton.jsx";
import {navbarActions} from "js/redux/actions";
import NavBarItem from "js/components/navbar/navbar-item/NavBarItem.jsx";

import "js/components/navbar/NavBar.scss"

class NavBar extends Component {
    onMenuClick = e => {
        if (this.props.opened) {
            this.props.close();
        }
        else {
            this.props.open();
        }
    }

    onLinkClick = e => {
        this.props.close();
    }

    renderItems() {
        return <>
            <NavBarItem onClick={this.onLinkClick} iconSrc={'images/sort_icon.png'} href={'/sort'}>Sorting algorithms</NavBarItem>
            <NavBarItem onClick={this.onLinkClick} iconSrc={'images/grid_icon.png'} href={'/grid'}>Grid</NavBarItem>
        </>
    }

    renderResponsiveMenu() {
        if (this.props.opened) {
            return <div className={"navbar-items-list"}>
                {this.renderItems()}
            </div>
        }
    }

    renderClassicMenu() {
        if (!this.props.opened) {
            return <div className={"navbar-items"}>
                {this.renderItems()}
            </div>
        }
    }

    render() {
        return (
            <div className={"navbar-group"}>
                <div className={"navbar"}>
                    <SubmitButton onClick={this.onMenuClick} className={"hamburger"}>
                        <img src={"images/hamburger_icon.png"} alt={""} width={20} height={20}/>
                    </SubmitButton>

                    <Link to={'/'} onClick={this.onLinkClick} className={"titleContainer"}>Krzysztof Kucharski</Link>

                    {this.renderClassicMenu()}

                </div>
                {this.renderResponsiveMenu()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.navbarReducer;
};


const mapDispatchToProps = {
    open: navbarActions.open,
    close: navbarActions.close
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);