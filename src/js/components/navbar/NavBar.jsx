import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import SubmitButton from "js/components/buttons/SubmitButton.jsx";
import {navbarActions} from "js/redux/actions";
import NavBarItem from "js/components/navbar/navbar-item/NavBarItem.jsx";
import {routes} from "js/routes/Routes.jsx";

import "js/components/navbar/NavBar.scss"

const mapRoutes = (actionOnClick) => {
    return routes.filter(v => v.navbar).map((p, k) => {
        return <NavBarItem onClick={actionOnClick} iconSrc={p.icon} href={p.path} key={k}>{p.title}</NavBarItem>
    });
};

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

    renderItems = () => <>{mapRoutes(this.onLinkClick)}</>;

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
            <div className={"navbar"}>
                <div className={"navbar-group"}>
                    <SubmitButton onClick={this.onMenuClick} className={"hamburger"}>
                        <img src={"images/hamburger_icon.png"} alt={""} width={20} height={20}/>
                    </SubmitButton>

                    <Link to={'/'} onClick={this.onLinkClick} className={"textContainer"}>Krzysztof Kucharski</Link>

                    {this.renderClassicMenu()}

                </div>
                {this.renderResponsiveMenu()}
            </div>
        );
    }
}

const mapStateToProps = state => state.navbarReducer;

const mapDispatchToProps = {
    open: navbarActions.open,
    close: navbarActions.close
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);