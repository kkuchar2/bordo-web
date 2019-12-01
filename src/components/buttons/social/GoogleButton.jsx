import React, {Component} from "react";

import IconButton from "components/buttons/IconButton.jsx";

import "./SocialButtons.scss"

class GoogleButton extends Component {
    render() {
        return (
            <IconButton
                className={"googleButton"}
                onClick={this.props.onClick}
                icon={require('images/google.png')}
                iconWidth={25}
                iconHeight={25}
                content={"Continue with Google"}/>
        )
    }
}

export default GoogleButton;