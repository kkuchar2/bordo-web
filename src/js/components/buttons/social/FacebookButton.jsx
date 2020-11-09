import React, {Component} from "react";

import IconButton from "js/components/buttons/IconButton.jsx";

import "js/components/buttons/social/SocialButtons.scss"

class FacebookButton extends Component {
    render() {
        return (
            <IconButton
                className={"facebookButton"}
                onClick={this.props.onClick}
                icon={require('images/fb_icon.png')}
                iconWidth={25}
                iconHeight={25}
                content={"Continue with Facebook"}>
            </IconButton>
        )
    }
}

export default FacebookButton;